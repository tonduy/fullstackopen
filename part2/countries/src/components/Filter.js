const Filter = ({newFilter, handleFilterChange}) => (
    <div>
        <form>
            find countries: <input value={newFilter} onChange={handleFilterChange}/>
        </form>
    </div>
)


export default Filter;