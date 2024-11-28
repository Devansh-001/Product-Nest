import { create } from "zustand"

export const useUserStore = create((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    createUser: async (newUser) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(newUser.email)) {
            toast({
                title: 'Invalid Email',
                description: 'Please enter a valid email address.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }


        if (!newUser.name || newUser.name.length < 1) {
            toast({
                title: 'Invalid Name',
                description: 'Name cannot be empty.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        const namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(newUser.name)) {
            toast({
                title: 'Invalid Name',
                description: 'Name should only contain letters and spaces.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        if (newUser.password.length < 6) {
            toast({
                title: 'Invalid Password',
                description: 'Password must be at least 6 characters long.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordPattern.test(newUser.password)) {
            toast({
                title: 'Weak Password',
                description: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        try {

            const res = await fetch("/api/users/signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, message: errorData.message || "Server error occurred." };
            }

            const data = await res.json();
            // const token=data.token;
            // localStorage.setItem("authToken",token)

            set((state) => ({ users: [...state.users, data.data] }));
            return { success: true, message: "User Signed Up Successfully" };
        }
        catch (error) {
            console.error("Error while creating user:", error.message);
            return { success: false, message: "Network or server error." };
        }
    },
    validateUser: async (user) => {

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(user.email)) {
            toast({
                title: 'Invalid Email',
                description: 'Please enter a valid email address.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        if (user.password.length < 6) {
            toast({
                title: 'Invalid Password',
                description: 'Password must be at least 6 characters long.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }


        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordPattern.test(user.password)) {
            toast({
                title: 'Weak Password',
                description: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        try {
            const res = await fetch("/api/users/signIn",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                },
            );

            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData.message);
                return { success: false, message: errorData.message || "Server error occurred." };
            }

            const data = await res.json();

            set((state) => ({ users: [...state.users, data.data] }));
            return { success: true, message: "User Signed In Successfully" };
        }
        catch (error) {
            console.error("Error while creating user:", error.message);
            return { success: false, message: "Network or server error." };
        }

    }
}));

