import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { login, isLoggingin } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="min-h-screen">
      <div className="flex  justify-center p-6 sm:p-12 mt-4">
        <div className=" w-full max-w-md space-y-5">
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="mt-4 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary mt-2" />
              </div>
              <h1 className="text-xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-2">

            <fieldset className="fieldset  bg-base-200 border-base-300 rounded-box border p-6">
              <legend className="fieldset-legend text-base">Sign In</legend>

              <div className="relative mt-4">
                <label className="label mb-1">Email</label>

                <div className="absolute left-3 flex items-center pointer-events-none z-10">
                  <Mail className="w-5 h-10 text-gray-500" />
                </div>

                <input
                  type="email"
                  className="input w-full pl-10"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div className="mt-4">
                <label className="label mb-1">Password</label>

                <div className="relative">
                  {/* Lock icon */}
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                    <Lock className="w-5 h-5 text-gray-500 " />
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    className="input w-full pl-10"
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>

                </div>
              </div>

              {/* SignIn Button */}
              <button className="relative block  group mt-8 ml-2"
                type="submit"
                disabled={isLoggingin}>

                <span className="absolute inset-0  bg-indigo-500  rounded-lg"></span>
                <div className="transition bg-black relative border-2 rounded-lg group-hover:translate-x-1 group-hover:-translate-y-1">
                  <div className="p-2">
                    <p className="text-medium font-outerSans font-medium text-white">
                      {isLoggingin ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Log In"
                      )}
                    </p>
                  </div>
                </div>
              </button>

            </fieldset>


          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SigninPage