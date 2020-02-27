# dot-card-contentlet



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                    | Default     |
| --------- | --------- | ----------- | ----------------------- | ----------- |
| `checked` | `checked` |             | `boolean`               | `undefined` |
| `item`    | --        |             | `DotCardContentletItem` | `undefined` |


## Events

| Event            | Description | Type                                  |
| ---------------- | ----------- | ------------------------------------- |
| `checkboxChange` |             | `CustomEvent<DotCardContentletEvent>` |


## Dependencies

### Used by

 - [dot-card-view](../../collections/dot-card-view)

### Depends on

- [dot-card](../../elements/dot-card)
- [dot-contentlet-thumbnail](../../elements/dot-contentlet-thumbnail)
- [dot-tooltip](../../elements/dot-tooltip)
- [dot-contentlet-state-icon](../../elements/dot-contentlet-state-icon)
- [dot-badge](../../elements/dot-badge)
- [dot-contentlet-lock-icon](../../elements/dot-contentlet-lock-icon)
- [dot-context-menu](../dot-context-menu)

### Graph
```mermaid
graph TD;
  dot-card-contentlet --> dot-card
  dot-card-contentlet --> dot-contentlet-thumbnail
  dot-card-contentlet --> dot-tooltip
  dot-card-contentlet --> dot-contentlet-state-icon
  dot-card-contentlet --> dot-badge
  dot-card-contentlet --> dot-contentlet-lock-icon
  dot-card-contentlet --> dot-context-menu
  dot-contentlet-thumbnail --> dot-contentlet-icon
  dot-contentlet-state-icon --> dot-tooltip
  dot-card-view --> dot-card-contentlet
  style dot-card-contentlet fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
