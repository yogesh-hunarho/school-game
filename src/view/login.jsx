import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"
import CyberpunkButton from "@/components/ui/cyber-button"
import CyberpunkInput from "@/components/ui/cyber-component/cyber-punk-input"
import { Terminal } from "lucide-react"

export default function CyberpunkLogin() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useAuthStore();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null)

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        setErrors(null);

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        // Mock API call simulation
        setTimeout(() => {
            if (payload.email && payload.password) {
                // Successful login
                setUser({ name: "Demo User", email: payload.email });
                setToken("demo-token-123");
            } else {
                setErrors({ email: ["Invalid credentials provided."] });
            }
            setLoading(false);
        }, 1000);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-950/20 via-slate-950 to-magenta-950/20 pointer-events-none" />

            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,0.05)_25%,rgba(0,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.05)_75%,rgba(0,255,255,0.05)_76%,transparent_77%,transparent)] bg-size[50px_50px]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md relative z-10"
            >
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-magenta-500 to-cyan-500 rounded-sm opacity-0  blur transition duration-500" />

                    <div className="relative bg-slate-950/95 backdrop-blur-sm border border-cyan-500/30 rounded-sm p-8">
                        <div className="absolute inset-0 pointer-events-none rounded-sm opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

                        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm" />
                        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-magenta-400 rounded-tr-sm" />
                        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-magenta-400 rounded-bl-sm" />
                        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-sm" />

                        <div className="space-y-6">
                            <motion.div variants={itemVariants} className="space-y-2 text-center">
                                <h1 className="text-4xl font-bold  uppercase tracking-wider">
                                    WELCOME <br /> BACK
                                </h1>
                                <p className="text-sm text-cyan-300/80 font-mono tracking-widest">&gt; ENTER CREDENTIALS</p>
                            </motion.div>

                            {errors && (
                                <div
                                    className="bg-red-950/60 border border-red-500/50 text-red-200 p-3 rounded-sm text-sm font-mono space-y-1"
                                >
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>❌ {errors[key][0]}</p>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={onSubmit} className="space-y-4">
                                <motion.div variants={itemVariants} className="space-y-2">
                                    <div className="group/input pt-4">
                                        <CyberpunkInput
                                            label="EMAIL"
                                            placeholder="ENTER_EMAIL"
                                            ref={emailRef}
                                            type="email"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="space-y-2">
                                    <div className="group/input pt-4">
                                        <CyberpunkInput
                                            label="PASSWORD"
                                            placeholder="ENTER_PASSWORD"
                                            ref={passwordRef}
                                            type="password"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="pt-2">
                                    <CyberpunkButton type="submit" disabled={loading} variant="primary" className={"w-full text-center relative group/btn overflow-hidden"}>
                                        <p className="relative inline-flex items-center text-white justify-center gap-2 rounded-sm font-mono font-bold uppercase tracking-wider text-sm">
                                            {loading ? (
                                                <>
                                                    <span className="inline-block w-4 h-4 border-2 animate-spin" />
                                                    PROCESSING...
                                                </>
                                            ) : (
                                                <>▶ INITIATE ACCESS</>
                                            )}
                                        </p>
                                    </CyberpunkButton>
                                </motion.div>
                            </form>

                            {/* <motion.div variants={itemVariants} className="text-center text-xs text-cyan-300/60 font-mono space-y-2">
                                <p>NO ACCOUNT?</p>
                                <Link
                                    to="/signup"
                                    className="inline-block text-magenta-400 hover:text-magenta-300 hover:shadow-lg hover:shadow-magenta-500/50 transition-all duration-200 font-bold underline decoration-magenta-500/50"
                                >
                                    &gt; CREATE NEW ACCESS
                                </Link>
                            </motion.div> */}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}