function mean(arr) {
  return arr.reduce((sum, value) => sum + value, 0) / arr.length;
}

function variance(arr, sample = true) {
  const m = mean(arr);
  const divisor = sample ? arr.length - 1 : arr.length;
  return arr.reduce((sum, value) => sum + (value - m) ** 2, 0) / divisor;
}

function stdDev(arr, sample = true) {
  return Math.sqrt(variance(arr, sample));
}

function covariance(x, y, sample = true) {
  const mx = mean(x);
  const my = mean(y);
  const divisor = sample ? x.length - 1 : x.length;
  let total = 0;
  for (let i = 0; i < x.length; i += 1) total += (x[i] - mx) * (y[i] - my);
  return total / divisor;
}

function correlation(x, y) {
  return covariance(x, y) / (stdDev(x) * stdDev(y));
}

function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

function multiplyMatrices(a, b) {
  const rows = a.length;
  const cols = b[0].length;
  const shared = b.length;
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      for (let k = 0; k < shared; k += 1) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

function multiplyMatrixVector(a, v) {
  return a.map((row) => row.reduce((sum, value, index) => sum + value * v[index], 0));
}

function invertMatrix(matrix) {
  const n = matrix.length;
  const augmented = matrix.map((row, i) => [
    ...row.map((value) => Number(value)),
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  ]);

  for (let i = 0; i < n; i += 1) {
    let pivot = augmented[i][i];
    if (Math.abs(pivot) < 1e-10) {
      const swapRow = augmented.findIndex((row, idx) => idx > i && Math.abs(row[i]) > 1e-10);
      if (swapRow === -1) throw new Error('Matrix is singular');
      [augmented[i], augmented[swapRow]] = [augmented[swapRow], augmented[i]];
      pivot = augmented[i][i];
    }

    for (let j = 0; j < 2 * n; j += 1) augmented[i][j] /= pivot;

    for (let k = 0; k < n; k += 1) {
      if (k === i) continue;
      const factor = augmented[k][i];
      for (let j = 0; j < 2 * n; j += 1) augmented[k][j] -= factor * augmented[i][j];
    }
  }

  return augmented.map((row) => row.slice(n));
}

function linearRegression(x, y) {
  const slope = covariance(x, y) / variance(x);
  const intercept = mean(y) - slope * mean(x);
  const predicted = x.map((value) => intercept + slope * value);
  const residuals = y.map((value, i) => value - predicted[i]);
  return { intercept, slope, predicted, residuals };
}

function multipleRegression(features, y) {
  const X = features.map((row) => [1, ...row]);
  const Xt = transpose(X);
  const XtX = multiplyMatrices(Xt, X);
  const XtY = multiplyMatrixVector(Xt, y);
  const beta = multiplyMatrixVector(invertMatrix(XtX), XtY);
  const predicted = X.map((row) => row.reduce((sum, value, i) => sum + value * beta[i], 0));
  const residuals = y.map((value, i) => value - predicted[i]);
  return { coefficients: beta, predicted, residuals };
}

function anova(groups) {
  const labels = Object.keys(groups);
  const all = labels.flatMap((label) => groups[label]);
  const overallMean = mean(all);
  const ssBetween = labels.reduce((sum, label) => sum + groups[label].length * (mean(groups[label]) - overallMean) ** 2, 0);
  const ssWithin = labels.reduce((sum, label) => sum + groups[label].reduce((inner, value) => inner + (value - mean(groups[label])) ** 2, 0), 0);
  const dfBetween = labels.length - 1;
  const dfWithin = all.length - labels.length;
  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / dfWithin;
  return {
    ssBetween,
    ssWithin,
    dfBetween,
    dfWithin,
    fStatistic: msBetween / msWithin
  };
}

function durbinWatson(residuals) {
  let numerator = 0;
  for (let i = 1; i < residuals.length; i += 1) numerator += (residuals[i] - residuals[i - 1]) ** 2;
  const denominator = residuals.reduce((sum, value) => sum + value ** 2, 0);
  return numerator / denominator;
}

function breuschPagan(residuals, predictors) {
  const squaredResiduals = residuals.map((value) => value ** 2);
  const aux = multipleRegression(predictors, squaredResiduals);
  const meanSq = mean(squaredResiduals);
  const sst = squaredResiduals.reduce((sum, value) => sum + (value - meanSq) ** 2, 0);
  const sse = aux.residuals.reduce((sum, value) => sum + value ** 2, 0);
  const rSquared = 1 - sse / sst;
  return { statistic: predictors.length * rSquared, rSquared };
}

function whiteTest(residuals, predictors) {
  const expanded = predictors.map((row) => {
    const [x1, x2] = row;
    return [x1, x2, x1 ** 2, x2 ** 2, x1 * x2];
  });
  return breuschPagan(residuals, expanded);
}

function capm(marketReturns, assetReturns, riskFreeRate = 0.005) {
  const excessMarket = marketReturns.map((value) => value - riskFreeRate);
  const excessAsset = assetReturns.map((value) => value - riskFreeRate);
  const reg = linearRegression(excessMarket, excessAsset);
  return {
    alpha: reg.intercept,
    beta: reg.slope,
    predicted: reg.predicted,
    residuals: reg.residuals
  };
}

function autocorrelation(series, lag = 1) {
  const trimmed = series.slice(lag);
  const base = series.slice(0, series.length - lag);
  return correlation(trimmed, base);
}

module.exports = {
  mean,
  variance,
  stdDev,
  covariance,
  correlation,
  linearRegression,
  multipleRegression,
  anova,
  durbinWatson,
  breuschPagan,
  whiteTest,
  capm,
  autocorrelation
};
