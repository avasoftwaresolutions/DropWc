import React, { Component } from 'react';
import {
	Text,
	ListView,
	TextInput,
	View,
	TouchableOpacity,
	Keyboard,
	FlatList,
	Modal, ScrollView
} from 'react-native';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class WcDrop extends Component{
	constructor(props) {
		super(props);
		this.state = {
			item: {},
			listItems: [],
			focus: false,
			modalVisible: false,
			modal: false,
		};
		this.renderList = this.renderList.bind(this);
	};

	componentDidMount(){
		const { items, defaultIndex, modal } = this.props;

		this.setState({ modal: modal ? modal : false });
		if (defaultIndex && items.length > defaultIndex) {
			this.setState({
				items,
				item: items[(defaultIndex-1)]
			});
		}
		else {
			this.setState({items});
		}
	}

	searchedItems= (searchedText) => {
		const ac = this.props.items.filter(function(item) {
			return item.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
		});
		let item = {
			id: -1,
			name: searchedText
		};
		this.setState({listItems: ac, item: item });

		const onTextChange = this.props.onTextChange;
		if (onTextChange && typeof onTextChange === 'function') {
			setTimeout(() => {
				onTextChange(searchedText);
			}, 0);
		}
	};

	renderItems = (item) => {
		return (
			<TouchableOpacity style={{ ...this.props.itemStyle }} onPress={() => {
				this.setState({ item: item, focus: false });
				Keyboard.dismiss();
				setTimeout(() => {
					this.props.onItemSelect(item);
				}, 0);
			}}>
				<Text style={{ ...this.props.itemTextStyle }}>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	renderList(){
		if(this.state.focus){
			return (
				<ListView
					style={{ ...this.props.itemsContainerStyle }}
					keyboardShouldPersistTaps="always"
					dataSource={ds.cloneWithRows(this.state.listItems)}
					renderRow={this.renderItems} />
			)
		}
	}

	renderFlatList(){
		if(this.state.focus){
			return (
				<FlatList
					style={{ ...this.props.itemsContainerStyle }}
					keyboardShouldPersistTaps="always"
					data={this.state.listItems}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({  item  }) => this.renderItems(item)} />
			)
		}
	}

	renderListType(){
		return this.props.listType === 'ListView' ? this.renderList() : this.renderFlatList();
	}

	viewList = () => {
		let styleInput = this.state.focus ? this.props.inputFocusStyle : this.props.containerStyle;
		return(
			<View keyboardShouldPersistTaps="always" style={{...this.props.containerStyle}}>
				<TextInput
					underlineColorAndroid={this.props.underlineColorAndroid}
					onFocus={() => {
						this.setState({
							focus: true,
							modalVisible: true,
							marginBottom : 20,
							item: {
								name: '',
								id: 0
							},
							listItems: this.props.items
						});
					}}
					onBlur={() => {
						this.setState({focus: false, modalVisible: false, marginBottom : 20,})
					}}
					ref={(e) => this.input = e}
					onChangeText={(text) => {
						this.searchedItems(text)
					}
					}
					value={this.state.item.name}
					style={{...styleInput}}
					placeholderTextColor={this.props.placeholderTextColor}
					placeholder={this.props.placeholder}
				/>
				<ScrollView
					keyboardShouldPersistTaps="always"
					keyboardDismissMode="on-drag"
				>
					{this.renderListType()}
				</ScrollView>
			</View>
		);
	};

	render() {
		if(this.state.focus && this.state.modalVisible && this.state.modal){
			return(
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setState({focus: false, modalVisible: false})
					}}>
					<View style={{marginTop: 20}}>
						<View>
							{ this.viewList() }
						</View>
					</View>
				</Modal>
			);
		}else {
			return( this.viewList() )
		}
	};
}
