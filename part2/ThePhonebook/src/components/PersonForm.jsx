const PersonForm = ({handleFormSubmit, newName, newNum,  handleInputChange, handleNumChange}) => {

    return (
      <form onSubmit={handleFormSubmit}>
        <div>
          <h1>add a new</h1>
          name: <input value={newName} onChange={handleInputChange} />
          <div>
            number: <input value={newNum} onChange={handleNumChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
}


export default PersonForm