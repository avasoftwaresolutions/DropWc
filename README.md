
# WCDROP
DropDown for React Native App!


# Introduction
List of items in dropdown, with search in input. Can be shown in a modal.


# Configuration
| Props| Type | Value | description 
|---------------------|--------------|-----------------------------------------------------|:------------------------------------------:
| onTextChange | function | this.onValueChangeList.bind(this) | Return of selected text
| onItemSelect | function | this.onValueChangeList.bind(this) | Return selected item
| containerStyle | object | paddingTop: 5, paddingLeft: 4, paddingBottom: 5, color: '#bbbbbb', fontSize: 16 | Style of the container
| inputFocusStyle | object | borderColor: '#ebebeb', borderWidth: 1, borderRadius: 5 | Style of the input in focus
| modal | boolean   | true | show in a modal
| textInputStyle | object | padding: 5, borderRadius: 5, color: '#bbbbbb' | Style of the input
| itemStyle | object | padding: 10, marginTop: 2, backgroundColor: '#ffffff', borderBottomColor: '#ebebeb', borderBottomWidth: 1, borderRadius: 5 | Style of the item container
| itemTextStyle | object | color: '#8350E7' | Style of the item
| itemsContainerStyle | object | flexDirection: 'row', borderColor: '#000' | Style of the all container
| items | array | arrayList | List of the array items
| defaultIndex | int | 1 | Index of the first item to display
| placeholder | string | 'Search' | Text of the input
| resetValue | boolean | true | Every search reset
| underlineColorAndroid | string | 'transparent' | 


# Example

```
import WellDropDown from './DropWc';
... 
<DropWc
  onTextChange={this.onValueChangeSpecialty.bind(this)}
  onItemSelect={this.onValueChangeSpecialty.bind(this)}
  //onItemSelect={item => alert(JSON.stringify(item))}
  containerStyle={{ paddingTop: 5, paddingLeft: 4, paddingBottom: 5, color: '#bbbbbb', fontSize: 16 }}
  inputFocusStyle={{ borderColor: '#ebebeb', borderWidth: 1, borderRadius: 5, }}
  modal={true}
  textInputStyle={{
    padding: 5,
    borderRadius: 5,
    color: '#bbbbbb',
  }}
  itemStyle={{
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ffffff',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    borderRadius: 5
  }}
  itemTextStyle={{ color: '#8350E7' }}
  itemsContainerStyle={{ flexDirection: 'row', borderColor: '#000' }}
  items={this.state.specialty}
  defaultIndex={1}
  placeholder="Digite a Especialidade aqui..."
  resetValue={true}
  underlineColorAndroid="transparent"
/>
```
