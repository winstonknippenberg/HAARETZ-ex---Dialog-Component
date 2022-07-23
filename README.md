#Dialog Exercise

####Features

- Focus is automatically trapped inside the dialog
- Focus will return to the element that was focused before opening.
- Esc closes the component automatically.
- Clicking outside the Dialog element will close the component.
- Gives you full control on the design!
- Component type validation for correct anatomy usage.
- While Dialog is open, outside elements are set to `aria-hidden = "true"`

#####External Libraries

- [aria-hidden](https://github.com/theKashey/aria-hidden)
- [Focus-Trap](https://github.com/focus-trap/focus-trap-react)
- [use-callback-ref](https://github.com/theKashey/use-callback-ref)

####Example Usage

```typescript
import Dialog from './components/Dialog';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <button onClick={() => setIsOpen(true)}>Click to Open Dialog</button>

      <Dialog handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <Dialog.Layout>
          <Dialog.Content>
          {/*insert your content here*/}
          </Dialog.Content>
        </Dialog.Layout>
      </Dialog>
    </main>
```

####API Reference

**Dialog**
| Prop | Type | Default Value |  
|-----------|-------|---------------|
| isOpen | `boolean` | none |
| handleClose | `Function` | none |
| appendTo? | `HTMLElement` | none |
| children | `ReactElement` | none |

- `Dialog` component only child is `Dialog.Layout`

**Dialog.Layout**

| Prop       | Type           | Default Value         |
| ---------- | -------------- | --------------------- |
| className? | `string`       | default layout design |
| children   | `ReactElement` | none                  |

- `Dialog.Layout` component only child is `Dialog.Content`

**Dialog.Content**

| Prop               | Type     | Default Value |
| ------------------ | -------- | ------------- |
| documentClassName? | `string` | none          |
| dialogClassName?   | `string` | none          |

- two classNames for one component for better control on design.
- dialogClassName is for `<dialog>` element class.
- documentClassName is for `<div role="document">` element class.

---
