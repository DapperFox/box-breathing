import React, { useEffect, useState, useRef } from 'react';
import Prompt from './Prompt'
import styled, { css } from 'styled-components'

export default function App() {
  const [loaded, setLoaded] = useState({
    l1: false,
    l2: false,
    l3: false,
    l4: false,
  })

  // Need this to update state in setTimeout
  const loadedRef = useRef(loaded)
  loadedRef.current = loaded

  const [reset, setReset] = useState(false)

  useEffect(() => {
    function clearLoaded () {
      setReset(true)
      setLoaded({
        l1: false,
        l2: false,
        l3: false,
        l4: false,
      })
      // Fix a bug with reset not being set long enough
      setTimeout(() => {
        launchTimers()
      }, 1)
    }

    function launchTimers () {
      setTimeout(() => {
        setReset(false)
        setLoaded({ ...loadedRef.current, l1: true })
      }, 0);
      setTimeout(() => {
        setLoaded({ ...loadedRef.current, l2: true })
      }, 4000);
      setTimeout(() => {
        setLoaded({ ...loadedRef.current, l3: true })
      }, 8000);
      setTimeout(() => {
        setLoaded({ ...loadedRef.current, l4: true })
      }, 12000);
      setTimeout(() => {
        clearLoaded();
      }, 16100);
    }

    launchTimers()
  }, [])

  return (
    <Main>
      <Prompt loaded={loaded}/>
      <BoxContainer>
        <Line1 />
        <Line2 />
        <Line3 />
        <Line4 />
        <Line1Load
          loaded={loaded.l1}
          reset={reset}
        />
        <Line2Load
          loaded={loaded.l2}
          reset={reset}
        />
        <Line3Load
          loaded={loaded.l3}
          reset={reset}
        />
        <Line4Load
          loaded={loaded.l4}
          reset={reset}
        />
      </BoxContainer>
    </Main>
  )
}

function dimensions () {
  let lineLength = 400
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    lineLength = 300
  }
  return {
    lineLength,
    lineHeight: 10
  }
}

const Main = styled.main`
  background: radial-gradient(circle at center, rgb(20, 30, 38) 0%, rgb(41, 61, 79) 120%);
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Line = styled.div`
  position: relative;
  background: rgba(35, 65, 77, .2);
`

const Line1 = styled(Line)`
  width: ${dimensions().lineLength}px;
  height: ${dimensions().lineHeight}px;

  top: 0;
  left: 0;
`

const Line2 = styled(Line)`
  top: 0;
  left: ${dimensions().lineLength - dimensions().lineHeight}px;
  height: ${dimensions().lineLength}px;
  width: ${dimensions().lineHeight}px;
`

const Line3 = styled(Line)`
  bottom: 0;
  left: 0;
  width: ${dimensions().lineLength}px;
  height: ${dimensions().lineHeight}px;
`

const Line4 = styled(Line)`
  top: ${`-${dimensions().lineLength + dimensions().lineHeight}px`};
  left: 0;
  height: ${dimensions().lineLength}px;
  width: ${dimensions().lineHeight}px;
`

const LineLoad = styled.div`
  display: block;
  background-color: rgba(35, 65, 77);
  position: absolute;
  transition-property: none;
  ${(props) => !props.reset && css`
    transition: all 4s linear;
  `}
`

const Line1Load = styled(LineLoad)`
  width: 0;

  ${(props) => props.loaded && css`
    width: ${dimensions().lineLength}px;
  `}
  height: ${dimensions().lineHeight}px;
  top: 0;
  left: 0;
`

const Line2Load = styled(LineLoad)`
  height: 0;

  ${(props) => props.loaded && css`
    height: ${dimensions().lineLength}px;
  `}
  width: ${dimensions().lineHeight}px;
  top: ${dimensions().lineHeight}px;
  left: ${ dimensions().lineLength - dimensions().lineHeight}px;
`

const Line3Load = styled(LineLoad)`
  width: 0;

  ${(props) => props.loaded && css`
    width: ${dimensions().lineLength}px;
  `}
  height: ${dimensions().lineHeight}px;
  top: ${dimensions().lineLength + dimensions().lineHeight}px;
  right: 0;
  direction: rtl;
`

const Line4Load = styled(LineLoad)`
  height: 0;

  ${(props) => props.loaded && css`
    height: ${dimensions().lineLength}px;
  `}
  width: ${dimensions().lineHeight}px;
  bottom: -${dimensions().lineHeight}px;
  left: 0;
  direction: rtl;
`

const BoxContainer = styled.div`
  width: ${dimensions().lineLength}px;
  height: ${dimensions().lineLength}px;
  position: relative;
`
