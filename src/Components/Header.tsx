import React from 'react';

function Header() {
    return (
        <div>
            <div style={{
                backgroundColor: '#007bff',
                height: '40px',
                color: "white",
                fontSize: '20px',
                padding: '4px',
                fontWeight: 'bold',
                textAlign: 'left',
                fontFamily: 'monospace'
            }}> <span style={{marginLeft:'10%'}}> Superfluid.finance</span>
            </div>
        </div>
    );
}

export default Header;
