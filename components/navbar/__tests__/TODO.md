# TODO — Fix Failing Navbar Test Suite

## Summary

- **Test Files:** 3
- **Passing:** 25
- **Failing:** 5

---

# Priority 1 — Contact Modals Tests

## File

`components/navbar/__tests__/contact-modals.test.tsx`

## Failures (2)

### 1. shows email label heading

**Likely cause**

- Email modal title text changed
- Conditional render broken
- Wrong `activeModal="email"` state in test

**TODO**

- [ ] Inspect expected heading text vs actual UI text
- [ ] Confirm email modal renders when `activeModal="email"`
- [ ] Update selector to use accessible role/text if markup changed
- [ ] Ensure heading uses semantic `<h*>`

---

### 2. switches to LiveChatPlaceholder when 'Open Live Chat' is clicked

**Likely cause**

- Button text changed
- Click handler not firing
- Async state update not awaited
- Placeholder component text changed

**TODO**

- [ ] Verify button label still equals `Open Live Chat`
- [ ] Use `await user.click(...)` instead of fireEvent if needed
- [ ] Use `findBy...` / `waitFor(...)` after click
- [ ] Confirm placeholder component actually mounts
- [ ] Check fallback text assertions

---

# Priority 1 — Navbar Tests

## File

`components/navbar/__tests__/navbar.test.tsx`

## Failures (3)

### 3. opens the phone modal when Phone item is clicked

**Likely cause**

- Phone trigger hidden in mobile state
- Label changed
- Click target no longer button/link
- Modal state not updating

**TODO**

- [ ] Confirm `Phone` trigger text still exists
- [ ] Ensure test viewport matches desktop/mobile intended state
- [ ] Use `userEvent.click`
- [ ] Assert modal content after click with async query

---

### 4. closes the modal when backdrop is clicked

**Likely cause**

- Backdrop selector outdated
- Click bubbling changed
- Modal uses portal

**TODO**

- [ ] Inspect rendered DOM for backdrop test id/class/role
- [ ] Click actual backdrop node
- [ ] If portal used, render with proper container
- [ ] Assert modal removed after click using `waitForElementToBeRemoved`

---

### 5. hamburger button label changes to 'Close menu' when open

**Likely cause**

- aria-label changed wording
- Menu state toggle failing
- Async rerender not awaited

**TODO**

- [ ] Confirm expected aria-label string exactly
- [ ] Check button toggles state on click
- [ ] Use `await user.click(...)`
- [ ] Use `expect(button).toHaveAttribute(...)`

---

# Cleanup / Best Practice Pass

## Testing Library Improvements

- [ ] Replace `fireEvent` with `userEvent`
- [ ] Prefer `screen.findBy...` for async UI
- [ ] Prefer role-based selectors over text-only selectors
- [ ] Avoid brittle exact text matches where copy may change

---

# Debug Workflow

- [ ] Run single file: `pnpm test navbar.test.tsx`
- [ ] Run watch mode
- [ ] Use `screen.debug()` on failing tests
- [ ] Inspect DOM after interactions

---

# Expected End State

- [ ] `30/30 tests passing`
- [ ] Stable selectors
- [ ] Accessibility-aligned tests
- [ ] No flaky modal interaction tests
