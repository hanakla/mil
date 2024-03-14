# mil

[Rouch sketched code]: Micro layout CSS-in-JS library

## Example

```tsx
import { mil } from '?mil'

export default function App() {
  return (
    <div
      className={
        mil.flex("column").p(8)
          .before(mil.contents("Hello"))
      }
    >
      World
    </div>
  )
}
