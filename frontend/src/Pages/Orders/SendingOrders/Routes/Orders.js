import React from 'react'
import FieldContainer from '../../../../Components/FieldContainer/FieldContainer'
function Orders() {
    return (
        <section>
            <div className='flex gap-[1.25rem] mainPadding'>
                <FieldContainer
                    select={true}
                    placeholder={'misol: Alo24'}
                    value={''}
                    label={"Do'konlar"}
                    onChange={() => {}}
                    options={[]}
                />
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
