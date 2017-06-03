import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
                        constructor(props) {
                        super(props);
                        this.state = {
                            registerAccount: false,
                        }
                    }

  setRegisterVisible( registerAccount ) {
                this.setState({
                    registerAccount,
                });}


  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  loginButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  registerButtonPress() {
    const { email, password } = this.props;

    this.props.registerUser({ email, password });
  }

  

  render() {

      const renderButton = (this.props.loading) ? <CardSection>
                                                      <Spinner size="large" />
                                                    </CardSection>
                                              :
                                                  (this.state.registerAccount) ?  <CardSection>
                                                                                    <Button onPress={this.registerButtonPress.bind(this)}>
                                                                                      Sign Up
                                                                                    </Button>
                                                                                  </CardSection>
                                                                              :
                                                                                  <View>
                                                                                    <CardSection>
                                                                                      <Button onPress={this.loginButtonPress.bind(this)>
                                                                                        Login
                                                                                      </Button>
                                                                                    </CardSection>
                                                                                    <CardSection>
                                                                                        <TouchableOpacity onPress={()=>this.setRegisterVisible(true)}>
                                                                                          <Text>
                                                                                            Create new account
                                                                                          </Text>  
                                                                                        </TouchableOpacity>
                                                                                    </CardSection>
                                                                                    </View>
                                                                                  ;



    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <View>
          { renderButton }
        </View>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, registerUser
})(LoginForm);
