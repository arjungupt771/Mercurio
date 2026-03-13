import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "./Header";
import { toast } from "react-toastify";
import { Form, Input, Button, Tabs, Space } from "antd";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const SignUpSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createUserDocument = async (user, name) => {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Account Created!");
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
      }
      setLoading(false);
    }
  };

  const signUpWithEmail = async (values) => {
    setLoading(true);
    const { name, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      await createUserDocument(user, name);
      toast.success("Successfully Signed Up!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error(
        "Error signing up with email and password: ",
        error.message
      );
    }
    setLoading(false);
  };

  const signInWithEmail = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
      toast.success("Logged In Successfully!");
    } catch (error) {
      toast.error(error.message);
      console.error(
        "Error signing in with email and password: ",
        error.message
      );
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDocument(user);
      toast.success("User Authenticated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="wrapper auth-wrapper">
        <div className="signup-signin-container">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Sign In" key="1">
              <Form
                layout="vertical"
                onFinish={signInWithEmail}
                hideRequiredMark
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="john@example.com"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    Log In
                  </Button>
                </Form.Item>
              </Form>

              <Space direction="vertical" style={{ width: "100%" }}>
                <Button
                  icon={<GoogleOutlined />}
                  block
                  onClick={signInWithGoogle}
                  loading={loading}
                >
                  Sign in with Google
                </Button>
              </Space>
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <Form
                layout="vertical"
                onFinish={signUpWithEmail}
                hideRequiredMark
              >
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: "Please enter your name" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>

              <Space direction="vertical" style={{ width: "100%" }}>
                <Button
                  icon={<GoogleOutlined />}
                  block
                  onClick={signInWithGoogle}
                  loading={loading}
                >
                  Sign up with Google
                </Button>
              </Space>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default SignUpSignIn;
