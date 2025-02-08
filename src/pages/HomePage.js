import Main from '../components/Main';

function HomePage ({selectedLanguage}) {
  return (
    <div className='h-[88vh]'>
      <Main selectedLanguage={selectedLanguage}/>
    </div>
  )
}

export default HomePage