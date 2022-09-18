import React, {useEffect, useState} from 'react'
import FilialConnectionCard from '../../Components/FilialConnectionCard/FilialConnectionCard'
import FieldContainer from '../../Components/FieldContainer/FieldContainer.js'
import Button from '../../Components/Buttons/BtnAddRemove.js'
import {useTranslation} from 'react-i18next'
import UniversalModal from '../../Components/Modal/UniversalModal.js'
import {regexForTypeNumber} from '../../Components/RegularExpressions/RegularExpressions.js'
import {useDispatch, useSelector} from 'react-redux'
import {
    clearMarketByInn,
    createRequestToConnection,
    getConnectionMarkets,
    getMarketByInn,
} from './connectionSlice.js'
import SearchForm from '../../Components/SearchForm/SearchForm.js'
import {map, uniqueId} from 'lodash'
function Connection() {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch()
    const {marketByInn, connections} = useSelector((state) => state.connections)
    const {market} = useSelector((state) => state.login)
    const [modalVisible, setModalVisible] = useState(false)
    const [inn, setInn] = useState('')
    const [modalBody, setModalBody] = useState('requestconnection')
    const [connectionMarkets, setConnectionMarkets] = useState(connections)

    const clearForm = () => {
        setInn('')
    }
    const handleInn = (e) => {
        let val = e.target.value
        if (regexForTypeNumber.test(val)) {
            setInn(val)
        }
    }
    const handelCloseModal = () => {
        setModalVisible(false)
        clearMarketByInn()
    }
    const handleFindMarketByInn = (e) => {
        e.preventDefault()
        dispatch(getMarketByInn({inn})).then(({error}) => {
            if (!error) {
                setModalVisible(true)
                setModalBody('requestconnection')
            }
        })
    }

    const sendingRequest = (e) => {
        e.preventDefault()
        setModalVisible(true)
        setModalBody('sendingApplication')
    }

    const requestApplication = (e) => {
        e.preventDefault()
        setModalVisible(true)
        setModalBody('requestApplication')
    }

    const handleCreateRequestToConnection = () => {
        const body = {firstMarket: market._id, secondMarket: marketByInn._id}
        dispatch(createRequestToConnection(body)).then(({error}) => {
            if (!error) {
                clearMarketByInn()
                setModalVisible(false)
                clearForm()
            }
        })
    }

    // modal toggle
    const toggleModal = () => setModalVisible(!modalVisible)
    console.log(connectionMarkets)
    useEffect(() => {
        setConnectionMarkets(connections)
    }, [connections])
    useEffect(() => {
        dispatch(getConnectionMarkets())
    }, [dispatch])

    return (
        <div>
            <UniversalModal
                body={modalBody}
                marketByInn={marketByInn}
                toggleModal={toggleModal}
                approveFunction={handleCreateRequestToConnection}
                closeModal={handelCloseModal}
                isOpen={modalVisible}
            />

            <form
                className={`flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200`}
            >
                <div className='supplier-style'>
                    <FieldContainer
                        value={inn}
                        onChange={handleInn}
                        label={t("Do'kon INN raqami")}
                        placeholder={`${t('misol')}: 123 456 789`}
                        border={true}
                    />
                    <div className={'flex gap-[1.25rem] grow'}>
                        <Button
                            onClick={handleFindMarketByInn}
                            add={true}
                            text={"Yangi do'kon qo'shish"}
                        />
                        <Button edit={true} text={'Yuborilganlar'} onClick={sendingRequest}/>
                        <Button bell={true} text={"So'rovlar"} onClick={requestApplication}/>
                    </div>
                </div>
            </form>

            <div className='mainPadding'>
                <p className='supplier-title text-center'>
                    {t("Hamkor do'konlar")}
                </p>
            </div>
            <SearchForm
                filterBy={['marketName', 'inn', 'directorName', 'lastname']}
            />
            <div className='mainPadding'>
                {connectionMarkets &&
                    map(connectionMarkets, (market) => (
                        <div key={uniqueId('markets')}>
                            <FilialConnectionCard market={market} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Connection
