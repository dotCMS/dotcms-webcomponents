# dot-card-view



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                      | Default     |
| -------- | --------- | ----------- | ------------------------- | ----------- |
| `items`  | --        |             | `DotCardContentletItem[]` | `[]`        |
| `value`  | `value`   |             | `string`                  | `undefined` |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `selected` |             | `CustomEvent<any>` |


## Methods

### `getValue() => Promise<DotContentletItem[]>`



#### Returns

Type: `Promise<DotContentletItem[]>`




## Dependencies

### Depends on

- [dot-card-contentlet](../../components/dot-card-contentlet)

### Graph
```mermaid
graph TD;
  dot-card-view --> dot-card-contentlet
  dot-card-contentlet --> dot-card
  dot-card-contentlet --> dot-context-menu
  dot-card-contentlet --> dot-contentlet-thumbnail
  dot-contentlet-thumbnail --> dot-contentlet-icon
  style dot-card-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
