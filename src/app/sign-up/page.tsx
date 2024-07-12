"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUp } from "../actions/auth";
import { useRouter } from "next/navigation";

export interface JoinFormData {
  name: string;
  email: string;
  password: string;
}

const JoinPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<JoinFormData>({
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<JoinFormData> = async (data) => {
    if (isValid) {
      const result = await signUp(data);

      if (result.error) {
        alert("이메일 중복");
        return;
      } else {
        alert("회원가입이 완료됨");
        router.push("/sign-in");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-cyan-400 to-blue-500">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden w-full max-w-md">
        <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl mb-6 text-center font-bold text-white">
            Create Account
          </h2>
          <div className="space-y-4">
            <div>
              <input
                {...register("name", {
                  required: "이름을 입력해주세요.",
                  pattern: {
                    value: /^[A-Za-z가-힣\s]{2,30}$/,
                    message: "2~30자의 영문, 한글, 공백만 허용됩니다.",
                  },
                })}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 bg-opacity-50 text-gray-800 focus:outline-none focus:bg-opacity-70 transition duration-300"
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "유효한 이메일 주소를 입력해주세요.",
                  },
                })}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 bg-opacity-50 text-gray-800 focus:outline-none focus:bg-opacity-70 transition duration-300"
                type="email"
                placeholder="E-mail"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다.",
                  },
                })}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 bg-opacity-50 text-gray-800 focus:outline-none focus:bg-opacity-70 transition duration-300"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg mt-6 transition duration-300 ${
              isValid ? "hover:opacity-90" : "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!isValid}
          >
            SIGN UP
          </button>
          <div className="text-center mt-4">
            <Link href="/sign-in" className="text-white hover:underline">
              SIGN IN
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
