import React, { useContext, useState, useEffect } from 'react'
import { Flex, Heading } from 'rebass'
import Context from './Context';


import { loadAirtable } from './data/loadAirtable'

const Load = () => {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    (async () => {
      const fetchedData = await loadAirtable()
      setData(fetchedData)
      setLoaded(true)
    })()
  }, [])

  if (loaded) {
    return (
      <Flex sx={{bg: dark ? 'dark' : 'light', width:'100%', height:'100%'}} >
        <Context data={data} dark={dark} setDark={setDark}/>
      </Flex>
    )
  } else {
    return (
        <Flex sx={{ flexFLow:'column nowrap',
                    justifyContent:'center',
                    alignItems:'center',
                    minHeight:'100vh'}}>
          <Heading sx={{fontSize:'medium'}}>Loading...</Heading>
        </Flex>
    )
  }
}

export default Load;
