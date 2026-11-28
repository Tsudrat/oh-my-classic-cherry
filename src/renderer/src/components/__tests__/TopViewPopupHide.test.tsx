import { act, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { usePopupHide } from '../TopView'

class MockPopup {
  static hide = vi.fn()
}

function Harness({ onHide }: { onHide: () => void }) {
  usePopupHide(MockPopup, onHide)
  return null
}

describe('usePopupHide', () => {
  const defaultHide = MockPopup.hide

  afterEach(() => {
    MockPopup.hide = defaultHide
    vi.clearAllMocks()
  })

  it('routes imperative hides to the mounted popup and restores the default on unmount', () => {
    const firstHide = vi.fn()
    const secondHide = vi.fn()
    const { rerender, unmount } = render(<Harness onHide={firstHide} />)

    act(() => {
      MockPopup.hide()
    })
    expect(firstHide).toHaveBeenCalledTimes(1)

    rerender(<Harness onHide={secondHide} />)
    act(() => {
      MockPopup.hide()
    })
    expect(secondHide).toHaveBeenCalledTimes(1)

    unmount()
    expect(MockPopup.hide).toBe(defaultHide)

    act(() => {
      MockPopup.hide()
    })
    expect(defaultHide).toHaveBeenCalledTimes(1)
    expect(firstHide).toHaveBeenCalledTimes(1)
    expect(secondHide).toHaveBeenCalledTimes(1)
  })
})
