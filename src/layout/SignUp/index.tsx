import login from '../../assets/login.png'
import AuthForm from '../../components/AuthForm'

const SingUp = () => {
  return (
    <main className='flex flex-col lg:flex-row items-center w-full h-screen justify-between from-pink-200 via-pink-400 to-pink-600'>
      <div className='w-full lg:w-[50%] px-10 h-full'>
        <section className='flex-center size-full max-sm:px-6 h-full'>
          <AuthForm type='sign-up' />
        </section>
      </div>
      <section className='w-full lg:w-[50%] h-full'>
        <img
          src={login}
          loading='lazy'
          className='h-full w-full object-cover rounded-l-xl bg-pink-200'
          alt='Auth image'
        />
      </section>
    </main>
  )
}

export default SingUp
