import React from 'react';

interface Props {

}

const SaveRecipePage: React.FC<Props> = ({}) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      event.target.reset()
      // await typedCreateRecipe()
    } catch (err: any) {
      window.alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='description'
        type='text'
        defaultValue=''
      />
      <input type='submit' value='Create recipe' />
    </form>
  )
}

export default SaveRecipePage;
