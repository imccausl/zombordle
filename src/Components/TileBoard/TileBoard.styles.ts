import styled from 'styled-components'

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
export const TileGroup = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-indent: 0;
  list-style-type: none;
`
