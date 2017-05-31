import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, registerUser } from '../actions';
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

  registerButtonPress() {
    const { email, password } = this.props;

    this.props.registerUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return  <CardSection>
                <Spinner size="large" />
              </CardSection>;  
    }

    return (
        <CardSection>
          <Button onPress={this.loginButtonPress.bind(this)}>
            Login
           </Button>

          <Button onPress={this.registerButtonPress.bind(this)}>
            Sign Up
          </Button>
        </CardSection>
    );
  }

  render() {
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

          {this.renderButton()}

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
