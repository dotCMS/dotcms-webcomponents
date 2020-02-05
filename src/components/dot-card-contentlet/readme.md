# dot-card-contentlet



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                    | Default     |
| -------- | --------- | ----------- | ----------------------- | ----------- |
| `item`   | --        |             | `DotCardContentletItem` | `undefined` |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `selected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dot-card-view](../../collections/dot-card-view)

### Depends on

- [dot-card](../../elements/dot-card)
- [dot-context-menu](../dot-context-menu)

### Graph
```mermaid
graph TD;
  dot-card-contentlet --> dot-card
  dot-card-contentlet --> dot-context-menu
  dot-card-view --> dot-card-contentlet
  style dot-card-contentlet fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
