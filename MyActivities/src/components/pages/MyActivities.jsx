    import Header from '../Home/Header' 
    function MyActivities() {
        const lorem = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae, quisquam facilis. Maxime sed officiis expedita optio laborum, doloremque praesentium beatae, odio, sit quod obcaecati assumenda cupiditate deleniti asperiores incidunt enim."
        return (
            <>
                <Header />
                <div>
                    <p>Hi this page is still in development</p>
                    <p>{[...Array(100)].map((_,i)=>(<p key={i}>{lorem}</p>))}</p>
                </div>
            </>
        )
    }
    export default MyActivities