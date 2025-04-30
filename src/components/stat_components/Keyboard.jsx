
const keyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['Space']
  ];

const getKeyColor = (keyAccuracy, key) => {
if (keyAccuracy[key] === undefined) return '#161616'; // Untyped keys

    const accuracies = Object.values(keyAccuracy).filter(a => a !== undefined);
    const mean = accuracies.reduce((sum, a) => sum + a, 0) / accuracies.length;
    const stdDev = Math.sqrt(accuracies.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) / accuracies.length);
    const deviations = (keyAccuracy[key] - mean) / stdDev;

    const colorStops = [
        { threshold: -2.5, color: 'worstAcc' },
        { threshold: -1.5, color: 'secondWorstAcc' },
        { threshold: -0.5, color: 'belowAvgAcc' },
        { threshold: 0.5,  color: 'aboveAvgAcc' },
        { threshold: 1.5,  color: 'secondBestAcc' }, 
        { threshold: 2.5,  color: 'bestAcc' } 
    ];

    let lowerStop, upperStop;
    for (let i = 0; i < colorStops.length - 1; i++) {
        if (deviations <= colorStops[i+1].threshold) {
        lowerStop = colorStops[i];
        upperStop = colorStops[i+1];
        break;
        }
    }

    const range = upperStop.threshold - lowerStop.threshold;
    const position = (deviations - lowerStop.threshold) / range;

    return interpolateColor(lowerStop.color, upperStop.color, position);
};
  

const interpolateColor = (color1, color2, factor) => {
    const hex = (color) => color.replace('#', '');
    const r1 = parseInt(hex(color1).substring(0, 2), 16);
    const g1 = parseInt(hex(color1).substring(2, 4), 16);
    const b1 = parseInt(hex(color1).substring(4, 6), 16);

    const r2 = parseInt(hex(color2).substring(0, 2), 16);
    const g2 = parseInt(hex(color2).substring(2, 4), 16);
    const b2 = parseInt(hex(color2).substring(4, 6), 16);

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
  
const keyAccuracy = {
    A: 0.97,
    S: 0.82,
    D: 0.58,
    F: 0.44,
    J: 0.91,
    K: 0.95,
    L: 0.78,
    ';': 0.55,
    Q: 0.88,
    W: 0.92,
    E: 0.66,
    R: 0.74,
    'Shift': 0.70,
    'Space': 0.99,
    '4': 0.67,
    '$': 0.32,
    'Backspace': 0.93,
    };

const getKeySize = (key) => {
    if (key === 'Backspace' || key === 'Enter' || key === 'Shift') {
        return 'flex-grow-2'; // Larger keys will grow
    }
    if (key === 'Space') {
        return 'flex-grow-5'; // Spacebar will be larger
    }
    return 'flex-grow'; // Default grow for regular keys
};

const colorCodeInfo = [
    {
        color: 'bg-worstAcc', label: 'catastrophe'
    },
    {
        color: 'bg-secondWorstAcc', label: 'weak point'
    },
    {
        color: 'bg-belowAvgAcc', label: 'below average'
    },
    {
        color: 'bg-aboveAvgAcc', label: 'above average'
    },
    {
        color: 'bg-secondBestAcc', label: 'strong point'
    },
    {
        color: 'bg-bestAcc', label: 'Incredible'
    }
]
  

const Keyboard = ({ className }) => {
    return (
        <div className={`${className} w-full flex flex-col overflow-auto justify-between py-4`}>
            <h2 className="text-3xl">Accuracy</h2>
            <div className="w-full inline-block px-10 mt-2">
                {keyboardLayout.map((row, i) => (
                    <div key={i} className="flex justify-center w-full">
                        {row.map((key, i) => (
                            <div 
                                key={i}
                                className={`text-sm text-center text-white px-2 py-2 rounded ${getKeySize(key)}`}
                                style={{
                                    flexBasis: key === 'Space' ? '45%' : 'auto',
                                    backgroundColor: getKeyColor(keyAccuracy, key)
                                }}
                            >
                                {key}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 px-2 mt-2">
                {colorCodeInfo.map((item, i) => (
                    <div key={i} className="flex items-center">
                        <div className={`${item.color} w-[1vw] h-[1vw] mr-1`}>
                        </div>
                        <h2>{item.label}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;