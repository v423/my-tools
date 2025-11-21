<script>
  let currentAge = 22;
  let retirementAgesInput = "40,45,50,55,60,65";
  let currentSalary = 0;
  let avgSocialSalary = 0;
  let workedYears = 0;
  let accountBalance = 0;
  let salaryGrowth = 0;
  let socialSalaryGrowth = 0;

  let showResult = false;
  /** @type {Array<{age: number, totalYears: number, finalBalance: number, finalSocialSalary: number, basicPension: number, accountPension: number, totalPension: number}>} */
  let results = [];

  function calculate() {
    const retirementAges = retirementAgesInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n >= 40 && n <= 65);
    results = [];

    const monthsFactors = {
      40: 233, 41: 230, 42: 226, 43: 223, 44: 220, 45: 216,
      46: 212, 47: 208, 48: 204, 49: 199, 50: 195, 51: 190,
      52: 185, 53: 180, 54: 175, 55: 170, 56: 164, 57: 158,
      58: 152, 59: 145, 60: 139, 61: 132, 62: 125, 63: 117,
      64: 109, 65: 101
    };

    retirementAges.forEach(retirementAge => {
      const futureYears = retirementAge - currentAge;
      if (futureYears <= 0) return; // 跳过无效年龄

      const totalYearsCalc = workedYears + futureYears;
      const finalSocialSalaryCalc = avgSocialSalary * Math.pow(1 + socialSalaryGrowth / 100, futureYears);

      let finalAccountBalance = accountBalance;
      let currentYearSalary = currentSalary;

      for (let i = 0; i < futureYears; i++) {
        const annualDeposit = currentYearSalary * 0.08 * 12;
        finalAccountBalance += annualDeposit;
        finalAccountBalance *= (1 + salaryGrowth / 100);
        currentYearSalary *= (1 + salaryGrowth / 100);
      }

      const avgContributionIndex = 1.0;
      const indexedMonthlySalary = finalSocialSalaryCalc * avgContributionIndex;
      const basicPensionCalc = (finalSocialSalaryCalc + indexedMonthlySalary) / 2 * totalYearsCalc * 0.01;

      // @ts-ignore
      const monthsFactor = monthsFactors[retirementAge] || 139;
      const accountPensionCalc = finalAccountBalance / monthsFactor;
      const totalPensionCalc = basicPensionCalc + accountPensionCalc;

      results.push({
        age: retirementAge,
        totalYears: totalYearsCalc,
        finalBalance: finalAccountBalance,
        finalSocialSalary: finalSocialSalaryCalc,
        basicPension: basicPensionCalc,
        accountPension: accountPensionCalc,
        totalPension: totalPensionCalc
      });
    });

    showResult = true;
  }
</script>

<div class="container">
  <h1>养老金计算器</h1>

  <div class="form-group">
    <label for="currentAge">当前年龄</label>
    <input type="number" id="currentAge" min="18" max="65" bind:value={currentAge}>
  </div>

  <div class="form-group">
    <label for="retirementAges">预计退休年龄（多个，用逗号分隔，如50,55,60,65）</label>
    <input type="text" id="retirementAges" bind:value={retirementAgesInput}>
  </div>

  <div class="row">
    <div class="col">
      <div class="form-group">
        <label for="currentSalary">当前月工资 (元)</label>
        <input type="number" id="currentSalary" min="0" bind:value={currentSalary}>
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <label for="avgSocialSalary">当地社平工资 (元)</label>
        <input type="number" id="avgSocialSalary" min="0" bind:value={avgSocialSalary}>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div class="form-group">
        <label for="workedYears">已工作年限</label>
        <input type="number" id="workedYears" min="0" max="50" bind:value={workedYears}>
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <label for="accountBalance">个人账户余额 (元)</label>
        <input type="number" id="accountBalance" min="0" bind:value={accountBalance}>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div class="form-group">
        <label for="salaryGrowth">工资年增长率 (%)</label>
        <input type="number" id="salaryGrowth" min="0" max="20" step="0.1" bind:value={salaryGrowth}>
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <label for="socialSalaryGrowth">社平工资年增长率 (%)</label>
        <input type="number" id="socialSalaryGrowth" min="0" max="20" step="0.1" bind:value={socialSalaryGrowth}>
      </div>
    </div>
  </div>

  <button class="btn" on:click={calculate}>计算养老金</button>

  {#if showResult}
  <div class="result">
    <h2>养老金估算结果</h2>
    <div class="results-grid">
      {#each results as result}
      <div class="age-result">
        <h3>退休年龄: {result.age} 岁</h3>
        <div class="result-item">
          <span>当前年龄: {currentAge} 岁 | 预计退休年龄: {result.age} 岁</span>
        </div>
        <div class="result-item">
          <span>退休时累计缴费年限:</span>
          <span class="result-value">{result.totalYears.toFixed(1)} 年</span>
        </div>
        <div class="result-item">
          <span>退休时个人账户余额:</span>
          <span class="result-value">{result.finalBalance.toFixed(0)} 元</span>
        </div>
        <div class="result-item">
          <span>退休时当地社平工资:</span>
          <span class="result-value">{result.finalSocialSalary.toFixed(0)} 元</span>
        </div>
        <div class="result-item">
          <span>基础养老金:</span>
          <span class="result-value">{result.basicPension.toFixed(0)} 元/月</span>
        </div>
        <div class="result-item">
          <span>个人账户养老金:</span>
          <span class="result-value">{result.accountPension.toFixed(0)} 元/月</span>
        </div>
        <div class="result-item" style="font-size: 16px; border-bottom: none;">
          <span><strong>预计每月总养老金:</strong></span>
          <span class="result-value" style="color: #e53935; font-size: 16px;">{result.totalPension.toFixed(0)} 元/月</span>
        </div>
      </div>
      {/each}
    </div>
  </div>
  {/if}

  <div class="formula">
    <h3>养老金计算公式</h3>
    <p><strong>基础养老金</strong> = (退休时当地社平工资 + 本人指数化月平均缴费工资) ÷ 2 × 缴费年限 × 1%</p>
    <p><strong>个人账户养老金</strong> = 个人账户累计储存额 ÷ 计发月数</p>
    <p><strong>总养老金</strong> = 基础养老金 + 个人账户养老金</p>
    <p>注：计发月数根据退休年龄确定（如50岁为195个月，55岁为170个月，60岁为139个月）</p>
  </div>

  <div class="note">
    <p><strong>注意：</strong>本计算器结果仅为估算值，实际领取金额可能因政策变化、个人实际情况等因素有所不同。最终养老金以社保部门核定为准。</p>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
    font-family: "Microsoft YaHei", sans-serif;
  }

  .container {
    padding: 20px;
    background-color: #f5f7fa;
    color: #333;
    line-height: 1.6;
  }

  .container > div {
    background-color: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #1a73e8;
    text-align: center;
    margin-bottom: 25px;
    border-bottom: 2px solid #e8eaf6;
    padding-bottom: 15px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #444;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  .row {
    display: flex;
    gap: 15px;
  }

  .col {
    flex: 1;
  }

  .btn {
    background-color: #1a73e8;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    margin: 10px 0;
    transition: background-color 0.3s;
  }

  .btn:hover {
    background-color: #0d62d9;
  }

  .result {
    background-color: #f5f7fa;
    padding: 15px;
    margin-top: 25px;
  }

  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 15px;
  }

  .result h2 {
    color: #1a73e8;
    margin-top: 0;
  }

  .result-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #d0e3ff;
    font-size: 14px;
  }

  .result-value {
    font-weight: bold;
    color: #1a73e8;
    font-size: 14px;
  }

  .note {
    background-color: #fff9e6;
    border-left: 4px solid #ffc107;
    padding: 12px 15px;
    margin-top: 20px;
    font-size: 14px;
  }

  .formula {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    margin-top: 20px;
    font-size: 14px;
  }

  .age-result {
    background-color: white;
    border: 1px solid #d0e3ff;
    border-radius: 6px;
    padding: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }

  .age-result h3 {
    color: #1a73e8;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 16px;
  }

  @media (max-width: 600px) {
    .row {
      flex-direction: column;
      gap: 0;
    }
  }
</style>