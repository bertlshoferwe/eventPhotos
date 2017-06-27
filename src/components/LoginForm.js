import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, registerUser } from '../actions';
import { Actions} from 'react-native-router-flux';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
                       
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

  

  render() {

      const renderButton = (this.props.loading) ? <CardSection>
                                                      <Spinner size="large" />
                                                    </CardSection>
                                              :
                                                    <CardSection>
                                                      <Button onPress={this.loginButtonPress.bind(this)}>
                                                        Login
                                                      </Button>
                                                    </CardSection>
                                                    
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
         <Text style={styles.successTextStyle}>
          {this.props.success}
        </Text>

          { renderButton }

         <CardSection>
            <TouchableOpacity onPress={ () => Actions.Register()}>
              <Text style={styles.successTextStyle}>
                Create new account
              </Text>  
            </TouchableOpacity>
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  successTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'green'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, success } = auth;

  return { email, password, error, loading, success };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, registerUser
})(LoginForm);
