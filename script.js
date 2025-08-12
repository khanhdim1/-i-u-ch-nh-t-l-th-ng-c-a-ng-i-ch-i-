const ADMIN_PASSWORD = "khánh123";

let winRate = 50;
let isAdminLoggedIn = false;
const loginSection = document.getElementById('login-section');
const adminSection = document.getElementById('admin-section');
const playerSection = document.getElementById('player-section');

const adminPasswordInput = document.getElementById('admin-password');
const loginBtn = document.getElementById('login-btn');
const loginMsg = document.getElementById('login-msg');

const winRateInput = document.getElementById('win-rate');
const setRateBtn = document.getElementById('set-rate-btn');
const currentRateText = document.getElementById('current-rate');
const logoutBtn = document.getElementById('logout-btn');

const playBtn = document.getElementById('play-btn');
const resultText = document.getElementById('result');
const logHistory = document.getElementById('log-history');

const MAX_LOG_LENGTH = 50; // Giới hạn log lưu 50 dòng

let logs = [];

// Hàm thêm log, hiển thị lịch sử chơi
function addLog(text) {
  const time = new Date().toLocaleTimeString();
  const entry = `[${time}] ${text}`;
  logs.unshift(entry);
  if (logs.length > MAX_LOG_LENGTH) {
    logs.pop();
  }
  logHistory.textContent = logs.join('\n');
}

// Đăng nhập admin
loginBtn.addEventListener('click', () => {
  const pass = adminPasswordInput.value.trim();
  if (pass === ADMIN_PASSWORD) {
    isAdminLoggedIn = true;
    loginMsg.textContent = '';
    loginSection.classList.add('hidden');
    adminSection.classList.remove('hidden');
    adminPasswordInput.value = '';
  } else {
    loginMsg.textContent = '⚠️ Mật khẩu sai! Thử lại.';
    adminPasswordInput.value = '';
  }
});

// Đăng xuất admin
logoutBtn.addEventListener('click', () => {
  isAdminLoggedIn = false;
  adminSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  loginMsg.textContent = '';
});

// Cập nhật tỉ lệ thắng
setRateBtn.addEventListener('click', () => {
  if (!isAdminLoggedIn) return;
  let val = parseInt(winRateInput.value);
  if (isNaN(val) || val < 0 || val > 100) {
    alert('⚠️ Vui lòng nhập số từ 0 đến 100!');
    return;
  }
  winRate = val;
  currentRateText.textContent = `${winRate}%`;
  resultText.textContent = '';
  addLog(`⚙️ Admin chỉnh tỉ lệ thắng thành ${winRate}%`);
});

// Người chơi bấm chơi
playBtn.addEventListener('click', () => {
  resultText.textContent = '... Đang xử lý kết quả ...';
  resultText.className = 'result';

  setTimeout(() => {
    const rand = Math.floor(Math.random() * 100);
    if (rand < winRate) {
      resultText.textContent = '🎉 Kết quả: Bạn ĐÃ THẮNG! (WIN)';
      resultText.classList.add('win');
      addLog(`Người chơi THẮNG (tỉ lệ ${winRate}%)`);
    } else {
      resultText.textContent = '💀 Kết quả: Bạn THUA rồi! (LOSE)';
      resultText.classList.add('lose');
      addLog(`Người chơi THUA (tỉ lệ ${winRate}%)`);
    }
  }, 1200);
});

// Khởi tạo hiển thị tỉ lệ thắng ban đầu
currentRateText.textContent = `${winRate}%`;
