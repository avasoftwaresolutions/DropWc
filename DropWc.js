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
export default class DropWc extends Component{
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
		let	itemStyle = styles.itemStyle,
			itemTextStyle = styles.itemTextStyle;
		if( this.props.itemStyle !== undefined || this.props.itemStyle !== '' ){
			itemStyle = ...this.props.itemStyle;
		}
		if( this.props.itemTextStyle !== undefined || this.props.itemTextStyle !== '' ){
			itemTextStyle = ...this.props.itemTextStyle;
		}
		return (
			<TouchableOpacity style={ itemStyle } onPress={() => {
				this.setState({ item: item, focus: false });
				Keyboard.dismiss();
				setTimeout(() => {
					this.props.onItemSelect(item);
				}, 0);
			}}>
				<Text style={ itemTextStyle }>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	renderList(){
		if(this.state.focus){
			return (
				<ListView
					style={{ this.props.itemsContainerStyle === undefined ? styles.itemsContainerStyle : ...this.props.itemsContainerStyle }}
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
					style={{ this.props.itemsContainerStyle === undefined ? styles.itemsContainerStyle : ...this.props.itemsContainerStyle }}
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
		let	containerStyle = styles.containerStyle,
			inputFocusStyle = styles.inputFocusStyle;
		if( this.props.containerStyle !== undefined || this.props.containerStyle !== '' ){
			containerStyle = ...this.props.containerStyle;
		}
		if( this.props.inputFocusStyle !== undefined || this.props.inputFocusStyle !== '' ){
			inputFocusStyle = ...this.props.inputFocusStyle;
		}
		let styleInput = this.state.focus ? this.props.inputFocusStyle : containerStyle;
		return(
			<View keyboardShouldPersistTaps="always" style={ containerStyle }>
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

const styles = StyleSheet.create({
	containerStyle: {
		paddingTop: 5,
		paddingLeft: 4,
		paddingBottom: 5,
		color: '#bbbbbb',
		fontSize: 16
	},
	inputFocusStyle:{
		borderColor: '#ebebeb',
		borderWidth: 1,
		borderRadius: 5
	},
	textInputStyle:{
		padding: 5,
		borderRadius: 5,
		color: '#bbbbbb',
	},
	itemStyle:{
		padding: 10,
		marginTop: 2,
		backgroundColor: '#ffffff',
		borderBottomColor: '#ebebeb',
		borderBottomWidth: 1,
		borderRadius: 5
	},
	itemTextStyle:{ color: '#8350E7' },
	itemsContainerStyle:{ flexDirection: 'row', borderColor: '#000' }
});
