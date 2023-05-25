import React from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { motion } from 'framer-motion';
import Logo from '../../Images/bale_logo.png'

const Loader = () => {
    return (
        <motion.div className='loader'
            animate={{
                x: 0,
                backgroundColor: "rgba(35, 150, 110, 0.3)",
                boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
                position: "fixed"
            }}
            transition={{ repeat: Infinity, duration: 1 }}
        >
            <div className='animation'>
                {/* <div className='animation-img'>
                    <motion.div className='animation-bg'
                        initial={{ rotate: [0, 9, 9, 0] }}
                        animate={{
                            rotate: [0, 360, 360, 0],
                        }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                    </motion.div>
                    <div className='animation-block'
                    >
                        <motion.div className='animation-icon'>
                            <motion.div
                                animate={{
                                    rotate: [0, 20, 20, 0],
                                }}
                                transition={{ repeat: 5, duration: .3 }}>
                                <BsFillTelephoneFill size={'1.25rem'} color={'#23BB86'} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
                <motion.div className='animation-text'
                    animate={{
                        color: "rgba(35, 150, 110, 0.9)",
                        scale: [1.3, 1, 1, 1, 1.3],
                    }}
                    transition={{ repeat: Infinity, duration: 3, from: 1.2 }}
                >
                    <p className='animation-name'>Bale</p>
                </motion.div> */}
                <img
                    src={Logo}
                    className={'w-[200px] pointer-events-none'}
                    alt='Alo24 logo'
                />
            </div>
        </motion.div>
    )
}

export default Loader