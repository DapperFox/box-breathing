import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components'

export default function App() {
  const length = 400;
  const lineWidth = 10;
  const [loaded1, setLoaded1] = useState(false)
  const [loaded2, setLoaded2] = useState(false)
  const [loaded3, setLoaded3] = useState(false)
  const [loaded4, setLoaded4] = useState(false)
  const [reset, setReset] = useState(false)

  useEffect(() => {
    function clearLoaded () {
      setReset(true)
      setLoaded1(false)
      setLoaded2(false)
      setLoaded3(false)
      setLoaded4(false)
      launchTimers()
    }

    function launchTimers () {
      setTimeout(() => {
        setReset(false)
        setLoaded1(true)
      }, 0);
      setTimeout(() => {
        setLoaded2(true)
      }, 4000);
      setTimeout(() => {
        setLoaded3(true)
      }, 8000);
      setTimeout(() => {
        setLoaded4(true)
      }, 12000);
      setTimeout(() => {
        clearLoaded();
      }, 16000);
    }

    launchTimers()
  }, [])

  return (
    <Main>
      <BoxContainer>
        <Line1
          length={length}
          lineWidth={lineWidth}
        />
        <Line2
          length={length}
          lineWidth={lineWidth}
        />
        <Line3
          length={length}
          lineWidth={lineWidth}
        />
        <Line4
          length={length}
          lineWidth={lineWidth}
        />
        <Line1Load
          length={length}
          lineWidth={lineWidth}
          loaded={loaded1}
          reset={reset}
        />
        <Line2Load
          length={length}
          lineWidth={lineWidth}
          loaded={loaded2}
          reset={reset}
        />
        <Line3Load
          length={length}
          lineWidth={lineWidth}
          loaded={loaded3}
          reset={reset}
        />
        <Line4Load
          length={length}
          lineWidth={lineWidth}
          loaded={loaded4}
          reset={reset}
        />
      </BoxContainer>
    </Main>
  )
}

function background (direction) {
  return (`
  background: rgba(32, 38, 56, .3)
`)}

const Main = styled.main`
  background-color: #222;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Annoying = styled.div`
  text-align: right;
`

const Line = styled.div`
  position: relative;
`

const Line1 = styled(Line)`
  width: ${(props) => `${props.length}px`};
  height: ${(props) => `${props.lineWidth}px`};

  top: 0;
  left: 0;
  ${background('right')}
`

const Line2 = styled(Line)`
  top: 0;
  left: ${(props) => `${props.length - props.lineWidth}px`};
  height: ${(props) => `${props.length}px`};
  width: ${(props) => `${props.lineWidth}px`};
  ${background('bottom')}
`

const Line3 = styled(Line)`
  bottom: 0;
  left: 0;
  width: ${(props) => `${props.length}px`};
  height: ${(props) => `${props.lineWidth}px`};
  ${background('left')}
`

const Line4 = styled(Line)`
  top: ${(props) => `-${props.length + props.lineWidth}px`};
  left: 0;
  height: ${(props) => `${props.length}px`};
  width: ${(props) => `${props.lineWidth}px`};
  ${background('top')}
`

const LineLoad = styled.div`
  display: block;
  background-color: rgba(32, 38, 56);
  position: absolute;
  transition-property: none;
  ${(props) => !props.reset && css`
    transition: all 4s linear;
  `}
`

const Line1Load = styled(LineLoad)`
  width: 0;

  ${(props) => props.loaded && css`
    width: ${(props) => `${props.length}px`};
  `}
  height: ${(props) => `${props.lineWidth}px`};
  top: 0;
  left: 0;
`

const Line2Load = styled(LineLoad)`
  height: 0;

  ${(props) => props.loaded && css`
    height: ${(props) => `${props.length}px`};
  `}
  width: ${(props) => `${props.lineWidth}px`};
  top: ${props => `${props.lineWidth}px`};
  left: ${props => props.length - props.lineWidth}px;
`

const Line3Load = styled(LineLoad)`
  width: 0;

  ${(props) => props.loaded && css`
    width: ${(props) => `${props.length}px`};
  `}
  height: ${(props) => `${props.lineWidth}px`};
  top: ${(props) => `${props.length + props.lineWidth}px`};
  right: 0;
  direction: rtl;
`

const Line4Load = styled(LineLoad)`
  height: 0;

  ${(props) => props.loaded && css`
    height: ${(props) => `${props.length}px`};
  `}
  width: ${(props) => `${props.lineWidth}px`};
  bottom: ${props => props.length + props.lineWidth}px;
  left: 0;
  direction: rtl;
`

const BoxContainer = styled.div`
  width: ${(props) => `${props.length}px`};
  height: ${(props) => `${props.length}px`};
  position: relative;
`
