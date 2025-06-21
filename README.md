# File Reader Action
A simple action which reads single file and stores it's contents in output. Configurable line or character limits for
special use cases.

## Usage
Adding workflow step
```yaml
- name: Read file
  uses: Toma1O6/file-read-action@v1
  with:
    file: 'CHANGELOG.md'
```

### Inputs
| Parameter   | Mandatory | Description                    | Default value |
|-------------|-----------|--------------------------------|---------------|
| `file`      | Yes       | Path to file                   |               |
| `encoding`  | No        | File encoding                  | utf-8         |
| `max-lines` | No        | Max lines for output           | 0 (no limit)  |
| `max-chars` | No        | Max character count for output | 0 (no limit)  |

### Outputs
| Name      | Description                           |
|-----------|---------------------------------------|
| `content` | Processed file content after trimming |

## Example usage in workflow
```yaml
name: Read file contents
on:
  push:
    tags:
      - 'release/*'
        
jobs:
  file-contents:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Read file
        id: read_file
        uses: Toma1O6/file-read-action@v1
        with:
          file: "CHANGELOG.md"
          max-lines: "20"
          max-chars: "1500"
          
      - name: Print file content
        run: echo "${{ steps.read_file.outputs.content }}"
```

## License
[MIT](https://github.com/Toma1O6/file-read-action/blob/master/LICENSE)