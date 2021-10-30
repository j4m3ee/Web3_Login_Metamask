const loginButton = document.getElementById('loginButton')
const userWallet = document.getElementById('userWallet')

function toggleButton() {
    if (!window.ethereum) {
        loginButton.innerText = 'Metamask is not installed'
        loginButton.classList.remove('bg-purple-500','text-white')
        loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed')
        return false
    }

    loginButton.addEventListener('click', loginWithMetaMask)
}

async function loginWithMetaMask() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((e) => {
        console.error(e.message)
        return
    })
    if (!accounts) { return }
    window.userWalletAddress = accounts[0]
    userWallet.innerText = window.userWalletAddress
    loginButton.innerText = "Sign out of metamask"

    loginButton.removeEventListener('click' , loginWithMetaMask)
    setTimeout(() => {
        loginButton.addEventListener('click', signOutOfMetamask)
    }, 200)
    
}

function signOutOfMetamask() {
    window.userWalletAddress = null
    userWallet.innerText = "null"
    loginButton.innerText = "Sign in with metamask"

    loginButton.removeEventListener('click' , signOutOfMetamask)
    setTimeout(() => {
        loginButton.addEventListener('click', loginWithMetaMask)
    }, 200)
}

window.addEventListener('DOMContentLoaded', (event) => {
    toggleButton()
})