# dot-card-contentlet



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                    | Default     |
| --------- | --------- | ----------- | ----------------------- | ----------- |
| `checked` | `checked` |             | `boolean`               | `undefined` |
| `item`    | --        |             | `DotCardContentletItem` | `undefined` |


## Events

| Event         | Description | Type                                  |
| ------------- | ----------- | ------------------------------------- |
| `valueChange` |             | `CustomEvent<DotCardContentletEvent>` |


## Dependencies

### Used by

 - [dot-card-view](../../collections/dot-card-view)

### Depends on

- [dot-card](../../elements/dot-card)
- [dot-context-menu](../dot-context-menu)
- [dot-contentlet-thumbnail](../../elements/dot-contentlet-thumbnail)

### Graph
```mermaid
graph TD;
  dot-card-contentlet --> dot-card
  dot-card-contentlet --> dot-context-menu
  dot-card-contentlet --> dot-contentlet-thumbnail
  dot-contentlet-thumbnail --> dot-contentlet-icon
  dot-card-view --> dot-card-contentlet
  style dot-card-contentlet fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
