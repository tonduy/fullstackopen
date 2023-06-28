const Filter = ({newFilter, handleFilterChange}) => (
    <div>
        <form>
            filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
        </form>
    </div>
)


export default Filter;