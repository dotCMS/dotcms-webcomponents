# dot-contentlet-state-icon

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description | Type                                                                        | Default                                                                                                                      |
| ------------ | --------- | ----------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `contentlet` | --        |             | `DotContentletItem`                                                         | `undefined`                                                                                                                  |
| `labels`     | --        |             | `{ archived: string; published: string; revision: string; draft: string; }` | `{         archived: 'Archived',         published: 'Published',         revision: 'Revision',         draft: 'Draft'     }` |
| `size`       | `size`    |             | `string`                                                                    | `'16px'`                                                                                                                     |


## Dependencies

### Used by

 - [dot-card-contentlet](../../components/dot-card-contentlet)

### Depends on

- [dot-tooltip](../dot-tooltip)

### Graph
```mermaid
graph TD;
  dot-contentlet-state-icon --> dot-tooltip
  dot-card-contentlet --> dot-contentlet-state-icon
  style dot-contentlet-state-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
