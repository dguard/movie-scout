import React from 'react'
import { Button, Row, Text } from 'components/ui'
import { Checkbox } from 'react-native-paper'
import { Theme } from 'themes'

type Props = {
  showFavorites: boolean
  displayHidden: boolean
  theme: Theme
  onToggleDisplayFavorites?: (value) => void
  onToggleDisplayHidden?: (value) => void
}

export function PreferencePanel({
  showFavorites,
  displayHidden,
  theme,
  onToggleDisplayFavorites,
  onToggleDisplayHidden,
}: Props) {
  return (
    <Row>
      <Button
        borderRadius={10}
        height={50}
        width={100}
        alignCenter
        row
        onPress={onToggleDisplayFavorites}>
        <Checkbox
          status={showFavorites ? 'checked' : 'unchecked'}
          theme={theme as any}
          onPress={() => {}}
        />
        <Text color="block.preferencePanel.favoritesTitle.color">Favorites</Text>
      </Button>
      <Button
        borderRadius={10}
        height={50}
        width={100}
        alignCenter
        row
        onPress={onToggleDisplayHidden}>
        <Checkbox
          status={displayHidden ? 'checked' : 'unchecked'}
          theme={theme as any}
          onPress={() => {}}
        />
        <Text color="block.preferencePanel.checkboxText.color">Hidden</Text>
      </Button>
    </Row>
  )
}
