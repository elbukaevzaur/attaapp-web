"use client"

import { User, Lock } from "lucide-react"
import styles from "./login.module.css"
import { useState, useEffect } from "react"
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import {SIGN_IN_REQUEST} from "@/lib/reducers";

export default function LoginPage() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [isFormFilled, setIsFormFilled] = useState(false)

    const {isAuth, isAuthError } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (isAuth) {
            router.push('/panel');
        }
    }, [isAuth]);

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const request = {
            login: login,
            password: password
        }
        dispatch(SIGN_IN_REQUEST(request))
    }

    // Check if both fields are filled
    useEffect(() => {
        setIsFormFilled(login.trim() !== "" && password.trim() !== "")
    }, [login, password])

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.logo}>
                    <span className={styles.logoGray}>ATTA</span>
                    <span className={styles.logoBlue}>APP</span>
                </h1>

                <form onSubmit={handleSignIn}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Логин"
                            className={styles.input}
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        <div className={styles.icon}>
                            <User size={20} />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Пароль"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={styles.icon}>
                            <Lock size={20} />
                        </div>
                    </div>

                    <button className={`${styles.button} ${isFormFilled ? styles.buttonFilled : ""}`}>Войти</button>
                </form>
            </div>
        </div>
    )
}
