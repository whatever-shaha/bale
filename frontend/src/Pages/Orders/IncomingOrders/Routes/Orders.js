import React from 'react'
import FieldContainer from '../../../../Components/FieldContainer/FieldContainer'
function Orders() {
    return (
        <section className='mainPadding'>
            <div>
                <h2 className='pb-[1.25rem] text-[1.25rem]'>Alo24 Amerika Filiali</h2>
                <FieldContainer
                    select={true}
                    placeholder={'misol: kompyuter'}
                    value={''}
                    label={'Maxsulotlar'}
                    onChange={() => {}}
                    options={[]}
                />
            </div>
           
        </section>
    )
}

export default Orders
