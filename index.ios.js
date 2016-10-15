/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Navigator
} from 'react-native';

class AwesomeProject extends Component {
    render() {
        let defaultName = 'List';
        let defaultComponent = List;

        return (
            <Navigator initialRoute={{name: defaultName, component: defaultComponent}}
                       configureScene={(route) => {
                           // console.log('configureScene: ' + JSON.stringify(route));
                           return Navigator.SceneConfigs.VerticalDownSwipeJump;
                       }}
                       renderScene={(route, navigator) => {
                           // console.log('renderScene: ' + JSON.stringify(route));
                           // console.log('renderScene: ' + JSON.stringify(navigator));
                           let Component = route.component;
                           return <Component {...route.params} navigator={navigator}></Component>
                       }}>
            </Navigator>
        );
    }
}

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            user: null
        };
    }

    _pressButton() {
        const {navigator} = this.props;

        const self = this;

        if(navigator) {
            navigator.push({
                name: 'detail',
                component: Detail,
                params: {
                    id: this.state.id,
                    getUser: function (user) {
                        self.setState({
                            user: user
                        });
                    }
                }
            });
        }
    }

    render() {
        if(this.state.user) {
            return (
                <View style={styles.flex}>
                    <Text style={styles.list_item}>用户信息: {JSON.stringify(this.state.user)}</Text>
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.flex}>
                    <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>☆ 豪华邮轮济州岛3日游</Text>
                    <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>☆ 豪华邮轮台湾3日游</Text>
                    <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>☆ 豪华邮轮地中海8日游</Text>
                </ScrollView>
            );
        }
    }
}

const USER_MODELS = {
    1: {name: 'sundalei', age: 28},
    2: {name: 'yetiantian', age: 25}
};

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    componentDidMount() {
        this.setState({
            id: this.props.id
        });
    }

    _pressButton() {
        const {navigator} = this.props;

        if(this.props.getUser) {
            let user = USER_MODELS[this.state.id];
            this.props.getUser(user);
        }
        if(navigator) {
            navigator.pop();
        }
    }

    render() {
        return (
            <ScrollView style={styles.flex}>
                <Text style={styles.list_item}>传递过来的用户id: {this.state.id}</Text>
                <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>点击我可以回去</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        marginTop: 25
    },

    list_item: {
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'center'
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);