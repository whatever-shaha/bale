import React from 'react'
import {map} from 'lodash'
import TableBtn from '../../Buttons/TableBtn.js'
import {useNavigate} from 'react-router-dom'
import {
    IoCheckmarkCircleSharp,
    IoCloseCircleSharp,
    IoHourglass,
} from 'react-icons/io5'
import SelectTable from '../../SelectTable/SelectTable.js'

export const RegisterOrdersTableRow = ({
    data,
    currentPage,
    countPage,
    currency,
    Print,
}) => {
    const navigate = useNavigate()
    const linkToSale = (order) => {
        navigate('/dukonlar/buyurtma_berish/buyurtmalar', {
            state: {order: {...order}},
        })
    }
    const positions = [
        {name: "so'ralgan", position: 'requested'},
        {name: 'tasdiqlangan', position: 'accepted'},
        {name: "jo'natilgan", position: 'send'},
        {name: 'qabul qilish', position: 'delivered'},
        {name: 'yakunlangan', position: 'completed'},
    ]

    const createOptions = (currentPosition) => {
        let hasEqual = false
        const checkPosition = ({position, currentPosition, index}) => {
            if (position.position === currentPosition) {
                hasEqual = true
            }
            return {
                label: (
                    <span className='flex'>
                        {position.position === currentPosition || !hasEqual ? (
                            <IoCheckmarkCircleSharp size={17} color={'green'} />
                        ) : (
                            <IoHourglass size={17} color='#F89009' />
                        )}
                        <span className='pl-2'>{position.name}</span>
                    </span>
                ),
                value: currentPosition,
                isDisabled:
                    index === 0
                        ? true
                        : !(
                              (positions[index - 1].position === 'send' &&
                                  currentPosition === 'send') ||
                              (currentPosition === 'delivered' &&
                                  positions[index].position === 'delivered')
                          ),
            }
        }
        return map(positions, (position, index) =>
            checkPosition({position, currentPosition, index})
        )
    }
    const createValue = (currentPosition) => {
        const check = currentPosition === 'rejected'
        const val = positions.find((pos) => pos.position === currentPosition)
        return {
            value: val?.position,
            label: (
                <span className='flex'>
                    {check ? (
                        <IoCloseCircleSharp size={17} color={'red'} />
                    ) : (
                        <IoCheckmarkCircleSharp size={17} color='green' />
                    )}{' '}
                    <span className='pl-2'>
                        {check ? 'red etilgan' : val?.name}
                    </span>
                </span>
            ),
            isDisabled: true,
        }
    }

    return (
        <>
            {map(data, (item, index) => (
                <tr key={index} className='tr'>
                    <td className='td py-2'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-end '>
                        <div className='flex justify-between'>
                            <span>
                                {new Date(item?.createdAt).toLocaleTimeString()}
                            </span>
                            <span>
                                {new Date(item?.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </td>
                    <td className='td text-end'>{item?.sender?.name}</td>
                    <td className='td text-start'>{item?.sender?.inn}</td>
                    <td className='td text-end'>{item?.id}</td>
                    <td className='td text-end'>{item?.products?.length}</td>
                    <td className='td text-end'>
                        {currency === 'UZS'
                            ? item?.totalpriceuzs?.toLocaleString('ru-Ru')
                            : item?.totalprice?.toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='td text-center'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'print'}
                                bgcolor={'bg-primary-800'}
                                onClick={() => Print(item)}
                            />
                            {
                                <TableBtn
                                    type={'edit'}
                                    bgcolor={'bg-warning-500'}
                                    onClick={() => linkToSale(item)}
                                    isDisabled={item?.position !== 'requested'}
                                />
                            }
                        </div>
                    </td>
                    <td className='td border-r-0'>
                        <SelectTable
                            onSelect={() => {}}
                            options={
                                item?.position !== 'rejected' &&
                                createOptions(item.position)
                            }
                            defaultValue={createValue(item.position)}
                        />
                    </td>
                </tr>
            ))}
        </>
    )
}
