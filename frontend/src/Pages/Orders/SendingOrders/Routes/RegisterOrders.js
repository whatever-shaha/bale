import React, {useEffect, useState} from 'react'
import FieldContainer from '../../../../Components/FieldContainer/FieldContainer'
import Table from '../../../../Components/Table/Table'
import {useSelector, useDispatch} from 'react-redux'
import SearchInput from '../../../../Components/Inputs/SearchInput.js'
import Spinner from '../../../../Components/Spinner/SmallLoader.js'
import {filter, map} from 'lodash'
import CategoryCard from '../../../../Components/CategoryCard/CategoryCard.js'
import NotFind from '../../../../Components/NotFind/NotFind.js'
import {IoAttach} from 'react-icons/io5'
import {useTranslation} from 'react-i18next'
import {getConnectionMarkets} from '../../../Connection/connectionSlice.js'
import socket from '../../../../Config/socket.js'
import {
    universalToast,
    warningCurrencyRate,
    warningSaleProductsEmpty,
} from '../../../../Components/ToastMessages/ToastMessages.js'
import {
    setAllProductsPartner,
    setCategoriesPartner,
} from '../Slices/registerOrdersSlice.js'
import {roundUsd, roundUzs} from '../../../../App/globalFunctions.js'
import UniversalModal from '../../../../Components/Modal/UniversalModal.js'
import {useNavigate} from 'react-router-dom'
import {
    createTemporaryOrder,
    deleteSavedOrder,
} from '../Slices/savedOrdersSlice.js'

function RegisterOrders() {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch()
    const {currencyType, currency} = useSelector((state) => state.currency)
    const {connections, loading} = useSelector((state) => state.connections)
    const {market} = useSelector((state) => state.login)
    const {categoriesPartner, allProductsPartner} = useSelector(
        (state) => state.registerOrders
    )

    const navigate = useNavigate()
    const [partners, setPartners] = useState()
    const [currentPartner, setCurrentPartner] = useState(null)
    const [filteredCategories, setFilteredCategories] =
        useState(categoriesPartner)
    const headers = [
        {title: '№', styles: 'w-[10%]'},
        {
            filter: '',
            title: 'Maxsulot kodi',
            styles: 'w-[10%]',
        },
        {
            title: 'Maxsulot nomi',
            filter: 'name',
        },
        {title: 'Maxsulot soni', filter: 'count', styles: 'w-[15%]'},
        {title: 'Maxsulot narxi', filter: 'price', styles: 'w-[15%]'},
        {
            title: 'Soni',
            filter: '',
            styles: 'w-[15%]',
        },
        {title: 'Jami'},
        {
            title: '',
            filter: '',
            styles: 'w-[10%]',
        },
    ]
    const [filteredProducts, setFilteredProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)
    const [searchCategory, setSearchCategory] = useState('')
    const [tableProducts, setTableProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState('')
    const [modalBody, setModalBody] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [totalOrderPrice, setTotalOrderPrice] = useState(0)
    const [totalOrderPriceUzs, setTotalOrderPriceUzs] = useState(0)
    const [temporary, setTemporary] = useState(null)

    const handleSearchCategory = (e) => {
        const str = e.target.value
        setSearchCategory(str)
        const searchedStr = str.replace(/\s+/g, ' ').trim()
        const filterData = filter(categoriesPartner, (obj) =>
            obj.name
                ? obj.name.toLowerCase().includes(searchedStr) ||
                  obj.code.includes(searchedStr)
                : obj.code.includes(searchedStr)
        )
        setFilteredCategories(str !== '' ? filterData : categoriesPartner)
    }
    const handleClickCategory = (id) => {
        if (activeCategory === id) {
            setActiveCategory(null)
        } else {
            setActiveCategory(id)
            setSearchCategory('')
            setFilteredCategories(categoriesPartner)
        }
    }
    const handleChangeSelectedProduct = (option) => {
        const hasProduct = option.barcode
            ? filter(
                  tableProducts,
                  (obj) => obj.product.barcode === option.barcode
              ).length > 0
            : filter(tableProducts, (obj) => obj.product._id === option.value)
                  .length > 0
        if (!hasProduct) {
            !option.barcode && setSelectedProduct(option)
            const product = option.barcode
                ? allProductsPartner.find(
                      (obj) => obj.productdata.barcode === option.barcode
                  )
                : allProductsPartner.find((obj) => obj._id === option.value)
            // if (product.total === 0) return warningCountSellPayment()
            const currentProduct = {
                sender: currentPartner.value,
                market: market._id,
                product: {
                    _id: product._id,
                    code: product.productdata.code,
                    name: product.productdata.name,
                    barcode: product.productdata.barcode,
                },
                productdata: product.productdata._id,
                category: product.category._id,
                totalprice: product.price.sellingprice,
                totalpriceuzs: product.price.sellingpriceuzs,
                pieces: 1,
                total: product.total,
                unitprice: product.price.sellingprice,
                unitpriceuzs: product.price.sellingpriceuzs,
                unit: product.unit,
            }
            setTableProducts([...tableProducts, currentProduct])
            setSelectedProduct('')
        } else {
            universalToast(t("Maxsulot ro'yxatda mavjud !"), 'error')
        }
    }
    const increment = (id) => {
        const newRelease = map(tableProducts, (prevProduct) =>
            prevProduct.product._id === id
                ? {
                      ...prevProduct,
                      pieces: Number(prevProduct.pieces) + 1,
                      totalprice: roundUsd(
                          (Number(prevProduct.pieces) + 1) *
                              prevProduct.unitprice
                      ),
                      totalpriceuzs: roundUzs(
                          (Number(prevProduct.pieces) + 1) *
                              prevProduct.unitpriceuzs
                      ),
                  }
                : prevProduct
        )
        setTableProducts(newRelease)
    }
    const decrement = (id) => {
        const newRelease = map(tableProducts, (prevProduct) =>
            prevProduct.product._id === id
                ? {
                      ...prevProduct,
                      pieces:
                          Number(prevProduct.pieces) > 1
                              ? Number(prevProduct.pieces) - 1
                              : 1,
                      totalprice: roundUsd(
                          (Number(prevProduct.pieces) > 1
                              ? Number(prevProduct.pieces) - 1
                              : 1) * prevProduct.unitprice
                      ),
                      totalpriceuzs: roundUzs(
                          (Number(prevProduct.pieces) > 1
                              ? Number(prevProduct.pieces) - 1
                              : 1) * prevProduct.unitpriceuzs
                      ),
                  }
                : prevProduct
        )
        setTableProducts(newRelease)
    }
    const handleDelete = (index) => {
        tableProducts.splice(index, 1)
        setTableProducts([...tableProducts])
    }

    const handleCloseModal = () => {
        setModalVisible(false)
        setTimeout(() => {
            setModalBody('')
        }, 500)
    }
    const handleClickOrder = () => {
        if (tableProducts.length) {
            const all = tableProducts.reduce(
                (acc, cur) => roundUsd(acc + cur.totalprice),
                0
            )
            const allUzs = tableProducts.reduce(
                (acc, cur) => roundUzs(acc + cur.totalpriceuzs),
                0
            )
            setTotalOrderPrice(all)
            setTotalOrderPriceUzs(allUzs)
            setModalVisible(true)
            setModalBody('complete')
        } else {
            !currency ? warningCurrencyRate() : warningSaleProductsEmpty()
        }
    }

    const clearAll = () => {
        setTableProducts([])
        setTotalOrderPrice(0)
        setTotalOrderPriceUzs(0)
        setModalVisible(false)
        setModalBody('')
    }

    const handleClickSave = () => {
        if (tableProducts.length > 0) {
            const all = tableProducts.reduce(
                (acc, cur) => roundUsd(acc + cur.totalprice),
                0
            )
            const allUzs = tableProducts.reduce(
                (acc, cur) => roundUzs(acc + cur.totalpriceuzs),
                0
            )
            const body = {
                temporary: {
                    partner: currentPartner,
                    tableProducts,
                    totalPrice: all,
                    totalPriceUzs: allUzs,
                },
            }
            dispatch(createTemporaryOrder(body)).then(({error}) => {
                if (!error) {
                    clearAll()
                    navigate('/dukonlar/buyurtma_berish/saqlanganlar')
                }
            })
            if (temporary) {
                dispatch(deleteSavedOrder({_id: temporary._id}))
                setTemporary(null)
            }
        } else {
            universalToast(t("Maxsulotlar ro'yxati bo'sh!"), 'warning')
        }
    }

    useEffect(() => {
        let allProductsReducer = []
        let productsForSearch = []
        if (market && currentPartner) {
            socket.emit('getPartnerProducts', {
                market: market._id,
                partner: currentPartner.value,
            })
            socket.on('partnerCategories', ({id, categories}) => {
                if (id === market._id) {
                    dispatch(setCategoriesPartner(categories))
                    setFilteredCategories(categories)
                }
            })
            socket.on('setPartnerProducts', ({id, products}) => {
                if (id === market._id) {
                    productsForSearch = [
                        ...productsForSearch,
                        ...map(products, (product) => ({
                            value: product._id,
                            label: `(${product.total}) ${product.category.code}${product.productdata.code} - ${product.productdata.name}`,
                        })),
                    ]
                    setFilteredProducts(productsForSearch)
                    allProductsReducer.push(...products)
                    dispatch(setAllProductsPartner(allProductsReducer))
                }
            })
            socket.on('error', ({id, message}) => {
                id === market._id && universalToast(message, 'error')
            })
        }
    }, [market, dispatch, currentPartner])
    useEffect(() => {
        dispatch(getConnectionMarkets())
    }, [dispatch])
    useEffect(() => {
        if (activeCategory) {
            const filteredData = filter(
                allProductsPartner,
                (product) => product.category._id === activeCategory
            )
            setFilteredProducts(
                map(filteredData, (product) => ({
                    value: product._id,
                    label: `(${product.total}) ${product.category.code}${product.productdata.code} - ${product.productdata.name}`,
                }))
            )
        } else {
            setFilteredProducts(
                map(allProductsPartner, (product) => ({
                    value: product._id,
                    label: `(${product.total}) ${product.category.code}${product.productdata.code} - ${product.productdata.name}`,
                }))
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategory, allProductsPartner])
    useEffect(() => {
        const partners = map(connections, (connection) => {
            const val = {
                label: connection?.name + ' - ' + connection?.inn,
                value: connection._id,
            }
            return val
        })
        setPartners(partners)
    }, [connections])
    return (
        <section className={'flex grow relative overflow-auto'}>
            <UniversalModal
                body={modalBody}
                isOpen={modalVisible}
                headerText={
                    modalBody === 'complete'
                        ? "Buyurtma uchun so'rov yuborishni tasdiqlaysizmi?"
                        : ''
                }
                toggleModal={handleCloseModal}
            />
            <div className='flex flex-col grow gap-[1.25rem] overflow-auto'>
                <div className='mainPadding flex flex gap-[1.25rem]'>
                    <FieldContainer
                        select={true}
                        placeholder={'misol: Alo24'}
                        value={currentPartner || ''}
                        label={'Do`kon nomi'}
                        onChange={(e) => setCurrentPartner(e)}
                        options={partners}
                        border={true}
                    />
                    <FieldContainer
                        disabled={!currentPartner}
                        select={true}
                        placeholder={'misol: kompyuter'}
                        value={''}
                        label={'Maxsulotlar'}
                        onChange={handleChangeSelectedProduct}
                        options={filteredProducts}
                    />
                </div>
                <div className='tableContainerPadding'>
                    {!tableProducts.length ? (
                        <NotFind
                            text={t("Buyurtmaga mahsulotlar qo'shilmagan!")}
                        />
                    ) : (
                        <Table
                            page='orderProducts'
                            data={tableProducts}
                            headers={headers}
                            currency={currencyType}
                            increment={increment}
                            decrement={decrement}
                            handleDelete={handleDelete}
                            footer={'registersale'}
                        />
                    )}
                </div>
            </div>
            <div className='register-selling-right min-w-[20.25rem] bg-white-400 backdrop-blur-[3.125rem] rounded-[0.25rem] flex flex-col gap-[1.25rem]'>
                <div className='flex flex-col grow gap-[1.25rem]'>
                    <SearchInput
                        placeholder={t('kategoriyani qidirish...')}
                        value={searchCategory}
                        onChange={handleSearchCategory}
                        onKeyUp={() => {}}
                    />
                    <div className='grow relative overflow-auto'>
                        <div className='cards-container absolute left-0 right-[0.125rem] top-0 bottom-0'>
                            {loading ? (
                                <div className='tableContainerPadding'>
                                    <Spinner />
                                </div>
                            ) : filteredCategories.length > 0 ? (
                                map(filteredCategories, (category) => (
                                    <CategoryCard
                                        key={category._id}
                                        id={category._id}
                                        activeCategory={
                                            category._id === activeCategory
                                        }
                                        title={category.name}
                                        code={category.code}
                                        products={category.products.length}
                                        onClick={handleClickCategory}
                                    />
                                ))
                            ) : (
                                <NotFind text={t('Kategoriya mavjud emas')} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={'flex gap-[0.625rem]'}>
                    <button
                        type={'button'}
                        className={'register-selling-right-accept-btn'}
                        onClick={handleClickOrder}
                    >
                        {t('Buyurtma berish')}
                    </button>
                    {
                        <button
                            type={'button'}
                            onClick={handleClickSave}
                            className={'register-selling-right-deny-btn'}
                        >
                            <IoAttach size={'1.5rem'} />
                        </button>
                    }
                </div>
            </div>
        </section>
    )
}

export default RegisterOrders
