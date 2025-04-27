import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLoginMutation } from "web/src/redux/features/auth/authApi";
import { z } from "zod";
import { logIn, selectToken } from "web/src/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "web/src/redux/hooks";
import { loginValidationSchema } from "web/src/schemas/authValidationSchema";
import { TUser } from "web/src/types/global.type";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const [login] = useLoginMutation();

    const token = useAppSelector(selectToken);
    // if (token) {
    //     navigation.navigate("Home");
    //     return null;
    // }

    const form = useForm<z.infer<typeof loginValidationSchema>>({
        resolver: zodResolver(loginValidationSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginValidationSchema>) {
        const toastId = toast.loading("Logging in.", { duration: 2000 });
        try {
            const response = await login(values).unwrap();
            const token = response?.data?.accessToken;
            if (token) {
                const user = jwtDecode(token) as TUser;
                dispatch(logIn({ token, user }));
                toast.success("Logged in successfully.", { id: toastId });
                // navigation.navigate("Home");
                form.reset();
            }
        } catch (error: any) {
            toast.error(
                error?.status === 401 || 403
                    ? "Email or password is incorrect."
                    : "Failed to login.",
                { id: toastId }
            );
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Continue your learning journey with RISE</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    {...form.register("email")}
                />
                {form.formState.errors.email && (
                    <Text style={styles.error}>{form.formState.errors.email.message}</Text>
                )}

                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        {...form.register("password")}
                    />
                    <TouchableOpacity
                        style={styles.togglePassword}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text>{showPassword ? "Hide" : "Show"}</Text>
                    </TouchableOpacity>
                </View>
                {form.formState.errors.password && (
                    <Text style={styles.error}>{form.formState.errors.password.message}</Text>
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={form.handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate("ForgetPassword")}
                    >
                        <Text style={styles.link}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.link}>Create account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "#666",
    },
    form: {
        width: "100%",
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: "#333",
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    passwordContainer: {
        position: "relative",
    },
    togglePassword: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    link: {
        fontSize: 14,
        color: "#007BFF",
    },
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 8,
    },
});