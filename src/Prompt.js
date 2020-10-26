import styled from 'styled-components'

export default function Prompt ({loaded}) {
  const { l1, l2, l3, l4 } = loaded

  function promptText () {
    if (l4) {
      return 'Hold'
    }
    if (l3) {
      return 'Exhale'
    }
    if (l2) {
      return 'Hold'
    }
    if (l1) {
      return 'Inhale'
    }
  }

  return (
    <Text>{ promptText() }</Text>
  )
}

const Text = styled.span`
  color: rgba(35, 65, 77);
  opacity: .5;
  margin-top: -10px;
  position: absolute;
  font-size: 1.8rem;
`
