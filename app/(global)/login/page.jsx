import BackToWebsiteLink from '@components/BackToWebsiteLink';
import SignInForm from '@components/SignInForm';


const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white h-[100vh] bg-white">
      <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
        <BackToWebsiteLink />
        <SignInForm />
      </div>
    </div>
  );
};

export default LoginPage;