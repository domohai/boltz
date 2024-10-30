import LoginForm from '@components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <div className="flex flex-col min-w-[35%] justify-center mt-[4rem]">
        {/* <SignInForm /> */}
        <LoginForm/>
      </div>
    </div>
  );
};

export default LoginPage;