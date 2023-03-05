import styled from 'styled-components'

export const TileBoardContainer = styled.ul`
  width: 100%;
  text-indent: 0;
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
