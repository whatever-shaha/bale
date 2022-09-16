import React from 'react'
import FilialButtons from '../FilialButtons/FilialButtons'
import ConnectionAvatar from '../Avatar/ConnectionAvatar'
const FilialConnectionCard = ({active, value}) => {

    return (
        <section>
            <div
                className={`shops_card flex gap-[1.25rem] ${
                    active ? 'active_shop' : ''
                }`}
            >
                <ConnectionAvatar border={true} director={value.director} />
                <div className='product-cost'>
                    <div
                        className={'flex flex-col items-center justify-center'}
                    >
                        <p className='product'>Do'kon INN</p>
                        <p className='product-number'>{value.shopInn}</p>
                    </div>
                    <div
                        className={'flex flex-col items-center justify-center'}
                    >
                        <p className='product'>Direktor</p>
                        <div className='flex gap-[5px]'>
                           <p className='product-number'>{value.directorName}</p>
                           <p className='product-number'>{value.directorLastName}</p>
                        </div>      
                    </div>
                    <div
                        className={'flex flex-col items-center justify-center'}
                    >
                        <p className='product'>Telefon</p>
                        <p className='product-number'>{value.phoneNumber}</p>
                    </div>
                </div>
                <div className='shop-name flex flex-col w-[13.4375rem]'>
                    <div className='shop-title'>
                        <p>{value.shopName}</p>
                    </div>
                    <div className={'filial-btn'}>      
                            <FilialButtons
                                type={'product'}
                            />
                            <FilialButtons
                                type={'selling'}
                            />          
                            <FilialButtons
                                type={'payments'}
                            />         
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FilialConnectionCard
