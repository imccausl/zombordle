import styled from 'styled-components'

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-indent: 0;
  margin: 0;
  padding: 0;
`

export const TileRowContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 0 5px 0;
  list-style-type: none;
  text-indent: 0;

  &:last-of-type {
    margin-bottom: 0;
  }
`
type InputRowContainerProps = {
  position: 'top' | 'bottom' | 'middle'
}

const positionMargin = {
  'top': '0 0 5px 0',
  'bottom': '5px 0 0 0',
  'middle': '5px 0 5px 0',
}

export const InputRowContainer = styled.div<InputRowContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 0 5px 0;
  list-style-type: none;
  text-indent: 0;
  margin: ${({ position }) => positionMargin[position ?? 'middle']}
`

export const TileGroup = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-indent: 0;
  list-style-type: none;
  margin: 0;
  padding: 0;
`
